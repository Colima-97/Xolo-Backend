'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const Property = require('../helpers/properties')
const StatusType = Property.StatusType
const UserType = Property.UserType
const DeliverymanType = Property.DeliverymanType

const DeliverymanSchema = new Schema({
    Id: { 
        type: Number,
        required: true, 
        unique: true 
    },
    Name: { 
        type: String, 
        required: true,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Por favor ingrese el nombre')
            }
        }
    },
    LastName: { 
        type: String, 
        required: true,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Por favor ingrese el apellido')
            }
        }
    },
    UserType,
    DeliverymanType,
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Por favor ingrese el email')
            }else if(!validator.isEmail(value)){
                throw new Error('Email inválido')
            }
        }
    },
    Username: {
        type: String,
        unique: true,
        required: true,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Por favor ingrese el número de teléfono')
            }else if(!validator.isMobilePhone(value, 'es-MX')){
                throw new Error('Número de teléfono incorrecto')
            }
        }
    },
    Token: {
        type: String,
        unique: true,
        required: true,
        select: false
    },
    Code: {
        type: String, 
        required: true,
        uppercase: true,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Por favor ingrese el código')
            }
        }
    },
    CreatedAt: {
        type: Date, 
        default: Date.now,
        immutable: true 
    },
    LastLogin: Date,
    StatusType,
    Latitude: {
        type: Number
    },
    Longitude: {
        type: Number
    }
})

module.exports = mongoose.model('deliveryman', DeliverymanSchema)
