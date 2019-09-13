const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const Enum = require('enum');

const clientSchema = new Schema({
    Id:{
        type: Number,
        required: true,
        unique: true
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
        default: 1,
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
                throw new Error('El estado del cliente es inválido')
            }else{
                this.Status = type.getValue(value)
            }
        }
    },
    Email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Por favor ingrese el email')
            }else if(!validator.isEmail(value)){
                throw new Error('Email inválido')
            }
        }
    },
    Street: String,
    ExternalNumber: {
        type: String,
        validate(value){
            if(validator.isAlpha(value, 'es-ES')){
                throw new Error('No puede ser sólo letras')
            }
        }
    },
    InternalNumber: {
        type: String,
    },
    Neighborhood: String,
    City: String,
    ZipCode: {
        type: String,
        validate(value){
            if(!validator.isPostalCode(value, 'MX')){
                throw new Error('El código postal es incorrecto')
            }
        }
    },
    References: String,
    Latitude: Number,
    Longitude: Number,
    Token: {
        type: String,
        unique: true,
        required: true,
        select: false
    },
    LastLogin: Date,
    CreatedAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

module.exports = mongoose.model('client_user', clientSchema);
