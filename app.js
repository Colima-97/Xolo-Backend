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
app.use(require('./routes/index'))
app.use(require('./routes/company_third_party'))
app.use(require('./routes/deliveryman'))
app.use(require('./routes/no_fixed_deliveryman_orders'))
app.use(require('./routes/orders'))

module.exports = app