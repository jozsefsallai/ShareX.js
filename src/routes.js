const express = require('express')
const path = require('path')
const multer = require('multer')
const uploadController = require('./uploadController')
const config = require('./config')

const upload = multer({ dest: 'tmp/' })

module.exports = function (app) {
  app.use(express.static(path.resolve(__dirname, '..', 'public')))
  app.post('/api/upload', upload.single('file'), uploadController.upload)
  app.get('*', uploadController.get)
}