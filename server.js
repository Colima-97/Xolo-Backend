'use strict'

if (process.env.Node_ENV !== 'production'){
  require('dotenv').config()
}

const app = require('./app')
const config = require('./config')
require('./database')

app.listen(config.port, () => {
  console.log('Server on port', config.port)
 })