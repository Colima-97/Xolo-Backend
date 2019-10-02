'use strict'

const Enums = require('./enums')

const StatusType = {
    type: String,
    required: true,
    validate(value){
        var type = Enums.StatusType
        if(!type.getValue(value)){
            throw new Error('Tipo de usuario inválido')
        }
    }
}

const StatusTypeClient = {
    type: String,
    required: true,
    validate(value){
        var type = Enums.StatusTypeClient
        if(!type.getValue(value)){
            throw new Error('Tipo de usuario inválido')
        }
    }
}

const UserType = {
    type: String,
    required: true,
    validate(value){
        var type = Enums.UserType
        if(!type.getValue(value)){
            throw new Error('Tipo de usuario inválido')
        }
    }
}

const DeliverymanType = {
    type: String,
    required: true,
    validate(value){
        var type = Enums.DeliverymanType
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