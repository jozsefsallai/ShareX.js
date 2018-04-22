const fs = require('fs-extra')
const path = require('path')
const config = require('./config.json')

const imagesFolder = path.resolve(__dirname, '..', 'public', config.app.savedir)

try {
  fs.accessSync(imagesFolder)
} catch (err) {
  fs.mkdirSync(imagesFolder)
}

function findFile(filename) {
  const file = path.resolve(imagesFolder, filename)
  let check = true

  try {
    fs.accessSync(filepath, fs.F_OK)
  } catch (err) {
    check = false
  }

  return check
}

function generateName() {
  let name = ""
  const allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (let i = 0; i < config.app.nameLength; i++) 
    name += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length))
  
  return name
}

module.exports.get = function (req, res) {
  res.status(403).send('Access denied')
}

module.exports.upload = function (req, res) {
  const file = req.file
  const ext = file.originalname.split('.').pop()

  if (config.app.key && req.get('key') != config.app.key) {
    return res.status(403).json({
      ok: false,
      error: 'FORBIDDEN'
    })
  }

  if (!file) {
    return res.status(422).json({
      ok: false,
      error: 'NO_FILE'
    })
  }

  const allowedExtensions = config.app.allowedExtensions

  if (!allowedExtensions.includes(ext)) {
    return res.status(422).json({
      ok: false,
      errors: 'FORBIDDEN_EXTENSION'
    })
  }

  let filename = generateName()

  while (findFile(`${filename}.${ext}`)) 
    filename = generateName()
  
  filename += `.${ext}`

  let imagePath = `${config.app.domain}/${config.app.savedir}/${filename}`
  
  fs.rename(file.path, path.resolve(imagesFolder, filename))
    .then(function () {
      return res.status(200).send(imagePath)
    })
    .catch(function (err) {
      res.status(422).json({
        ok: false,
        error: err
      })
    })
}