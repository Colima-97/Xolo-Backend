'use strict'

const mongoose = require('mongoose')
const config = require('./config')

mongoose.set('useFindAndModify', false);
mongoose.connect(config.db, {
   useCreateIndex: true,
   useNewUrlParser: true,
   useFindAndModify: false 
}).then(db => console.log('Connected to Moongose')).catch(err => console.error(err));

/*mongoose.connect(
  process.env.DATABASE_URL || 'mongodb://localhost/XoloApp',
  {
    useNewUrlParser: true
  }
)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Moongose'))*/