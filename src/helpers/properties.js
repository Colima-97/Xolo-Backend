'use strict'

const Enums = require('./enums')
const Strings = require('./strings')

const StatusType = {
    type: String,
    required: true,
    validate(value){
        var type = Enums.StatusType
        if(!type.getValue(value)){
            throw new Error(Strings.err_Status)
        }
    }
}

const StatusTypeClient = {
    type: String,
    required: true,
    validate(value){
        var type = Enums.StatusTypeClient
        if(!type.getValue(value)){
            throw new Error(Strings.err_Status)
        }
    }
}

const UserType = {
    type: String,
    required: true,
    validate(value){
        var type = Enums.UserType
        if(!type.getValue(value)){
            throw new Error(Strings.err_Type)
        }
    }
}

const DeliverymanType = {
    type: String,
    required: true,
    validate(value){
        var type = Enums.DeliverymanType
        if(!type.getValue(value)){
            throw new Error(Strings.err_TypeDeliveryman)
        }
    }
}

module.exports = {
    UserType,
    StatusType,
    StatusTypeClient,
    DeliverymanType
}