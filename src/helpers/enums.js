'use strict'

const Enum = require('enum')
const Strings = require('./strings')

var StatusType = new Enum({ 1: Strings.pending, 2: Strings.active, 3: Strings.inactive, 4: Strings.banned })
var StatusTypeClient = new Enum({ 1: Strings.unknown, 2: Strings.active, 3: Strings.inactive, 4: Strings.banned })
var UserType = new Enum({ 1: Strings.client, 2: Strings.deliveryman, 3: Strings.restaurantadmin, 4: Strings.restaurantemployee, 5: Strings.thirdparty })
var DeliverymanType = new Enum({ 1: Strings.fixed, 2: Strings.nonfixed })

module.exports = {
    StatusType,
    StatusTypeClient,
    UserType,
    DeliverymanType
}