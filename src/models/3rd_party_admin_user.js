'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const validator = require('validator')
const Property = require('../helpers/properties')
const UserType = Property.UserType

const thirdPartyAdminUserSchema = new Schema({
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
    Username: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Por favor ingrese el usuario')
            }
        }
    },
    Password: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
        trim: true,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Por favor ingrese su contraseña')
            }else if(validator.equals(value.toLowerCase(), "password")){
                throw new Error('Contraseña inválida')
            }else if(validator.isLength(value, 8, undefined)){
                throw new Error('La contraseña debe contener 8 dígitos como mínimo')
            }
        }
    },
    CellPhone: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Por favor ingrese el número de teléfono')
            }else if(!validator.isMobilePhone(value, 'es-MX')){
                throw new Error('Número de teléfono incorrecto')
            }
        }
    },
    LastLogin: Date,
    CreatedAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    Tokens:[{
        token: {
            type: String,
            required: true, 
            select: false
        }
    }],
    UserType
})

thirdPartyAdminUserSchema.pre('save', (next) => {
    let thirdparty = this

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(thirdparty.Password, salt, null, (err, hash) => {
            if(err) return next(err)

            thirdparty.Password = hash
            next()
        })
    })
})

module.exports = mongoose.model('third_party_admin_user', thirdPartyAdminUserSchema)
