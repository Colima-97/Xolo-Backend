'use strict'

const Strings = require('./strings')

const StatusType = {
    type: String,
    required: true,
    validate(value){
        var type = Strings.StatusType
        if(!type.getValue(value)){
            throw new Error('Tipo de usuario inválido')
        }
    }
}

const StatusTypeClient = {
    type: String,
    required: true,
    validate(value){
        var type = Strings.StatusTypeClient
        if(!type.getValue(value)){
            throw new Error('Tipo de usuario inválido')
        }
    }
}

const UserType = {
    type: String,
    required: true,
    validate(value){
        var type = Strings.UserType
        if(!type.getValue(value)){
            throw new Error('Tipo de usuario inválido')
        }
    }
}

const DeliverymanType = {
    type: String,
    required: true,
    validate(value){
        var type = Strings.DeliverymanType
        if(!type.getValue(value)){
            throw new Error('El tipo de repartidor es inválido')
        }
    }
}

module.exports = {
    UserType,
    StatusType,
    StatusTypeClient,
    DeliverymanType
}