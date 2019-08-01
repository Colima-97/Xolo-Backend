'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(expressLayouts)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

// Routes
app.use(require('./src/routes/index'))
app.use(require('./src/routes/client'))
app.use(require('./src/routes/restaurant'))

module.exports = app 