const winston = require('winston')
const config = require('./config')

module.exports = function (app) {
  return app.listen(config.app.port, function () {
    winston.log('info', `App running on port ${config.app.port}`)
  })
}