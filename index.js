const express = require('express')
const app = express()

require('./src/routes')(app)
require('./src/boot')(app)