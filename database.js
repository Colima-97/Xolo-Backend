'use strict'

const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.db, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false 
}).then(db => console.log('Connected to Moongose')).catch(err => console.error(err))