'use strict'

const Enum = require('enum')

var StatusType = new Enum({ 1: 'pending', 2: 'active', 3: 'inactive', 4: 'banned' })
var StatusTypeClient = new Enum({ 1: 'unknown', 2: 'active', 3: 'inactive', 4: 'banned' })
var UserType = new Enum({ 1: 'client', 2: 'deliveryman', 3: 'restaurantadmin', 4: 'restaurantemployee', 5: 'thirdparty' })
var DeliverymanType = new Enum({ 1: 'fixed', 2:'nonfixed' })

module.exports = {
    StatusType,
    StatusTypeClient,
    UserType,
    DeliverymanType
}