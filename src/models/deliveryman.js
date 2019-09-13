'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const Enum = require('enum')

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
    UserType: { 
        type: String,
        default: 2,
        validate(value){
            var type = new Enum({1: 'client', 2: 'deliveryman', 3: 'restaurantadmin', 4: 'restaurantemployee', 5: 'thirdparty'})
            if(!type.getValue(value)){
                throw new Error('Tipo de usuario inválido')
            }else{
                this.UserType = type.getValue(value)
            }
        }
    },
    DeliverymanType: { 
        type: String, 
        required: true,
        validate(value){
            var type = new Enum({1: 'fixed', 2:'nonfixed'})
            if(!type.getValue(value)){
                throw new Error('El tipo de repartidor es inválido')
            }else{
                this.DeliverymanType = type.getValue(value)
            }
        }
    },
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
    CreateAt: { 
        type: Date, 
        default: Date.now 
    },
    LastLogin: Date, 
    StatusType: { 
        type: String, 
        default: 1,
        validate(value){
            var type = new Enum({1: 'pending', 2: 'active', 3: 'inactive', 4: 'banned'})
            if(!type.getValue(value)){
                throw new Error('El estado del repartidor es inválido')
            }else{
                this.Status = type.getValue(value)
            }
        }
    },
    Latitude: {
        type: Number
    },
    Longitude: {
        type: Number
    }
})

module.exports = mongoose.model('deliveryman', DeliverymanSchema)
