'use strict'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = require('./app')
const config = require('./config')
require('./database')

// Server is listenning
app.listen(config.port, () => {
  console.log('Server on port', config.port)
})
