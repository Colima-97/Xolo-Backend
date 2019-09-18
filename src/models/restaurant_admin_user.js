'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');
const Enum = require('enum');

const restAdminUserSchema = new Schema({
    Id: {
        type: Number,
        required: true,
        unique: true
    },
    RestaurantId: {
        type: Number,
        required: true,
        unique: true
    },
    RestaurantName: {
        type: String,
        required: true,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Por favor ingrese el nombre')
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
    UserType: {
        type: String,
        default: 3,
        validate(value){
            var type = new Enum({1: 'client', 2: 'deliveryman', 3: 'restaurantadmin', 4: 'restaurantemployee', 5: 'thirdparty'})
            if(!type.getValue(value)){
                throw new Error('Tipo de usuario inválido')
            }else{
                this.UserType = type.getValue(value)
            }
        }
    },
    StatusType: { 
        type: String, 
        default: 2,
        validate(value){
            var type = new Enum({1: 'unknown', 2: 'active', 3: 'inactive', 4: 'banned'})
            if(!type.getValue(value)){
                throw new Error('El estado del Administrador es inválido')
            }else{
                this.Status = type.getValue(value)
            }
        }
    },
    LastLogin: Date,
    CreatedAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    Tokens: [{
        token: {
            type: String,
            required: true, 
            select: false
        }
    }],

});

restAdminUserSchema.pre('save', (next) =>{
    let rauSchema = this

    bcrypt.genSalt(10, (err, salt) =>{
        if (err) return next(err)

        bcrypt.hash(rauSchema.Password, salt, null, (err, hash) => {
            if(err) return next(err)

            rauSchema.Password = hash
            next()
        })
    })
});

module.exports = mongoose.model('restaurant_admin_user', restAdminUserSchema);