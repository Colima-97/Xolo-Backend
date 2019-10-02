'use strict'

const Enum = require('enum')
const Strings = require('./strings')

var StatusType = new Enum({ 1: 'pending', 2: Strings.active, 3: Strings.inactive, 4: Strings.banned })
var StatusTypeClient = new Enum({ 1: 'unknown', 2: Strings.active, 3: Strings.inactive, 4: Strings.banned })
var UserType = new Enum({ 1: 'client', 2: 'deliveryman', 3: 'restaurantadmin', 4: 'restaurantemployee', 5: 'thirdparty' })
var DeliverymanType = new Enum({ 1: 'fixed', 2:'nonfixed' })

module.exports = {
    StatusType,
    StatusTypeClient,
    UserType,
    DeliverymanType
}