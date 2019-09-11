const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const Enum = require('enum');

const clientSchema = new Schema({
    id_client:{
        type: Number,
        required: true,
        unique: true
    },
    username: {
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
    name: {
        type: String,
        required: true,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Por favor ingrese el nombre')
            }
        }
    },
    last_name: {
        type: String,
        required: true,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Por favor ingrese el apellido')
            }
        }
    },
    user_type: {
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
    email: {
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
    street: String,
    external_number: {
        type: String,
        validate(value){
            if(validator.isAlpha(value, 'es-ES')){
                throw new Error('No puede ser sólo letras')
            }
        }
    },
    internal_number: {
        type: String,
    },
    neighborhood: String,
    city: String,
    zip_code: {
        type: String,
        validate(value){
            if(!validator.isPostalCode(value, 'MX')){
                throw new Error('El código postal es incorrecto')
            }
        }
    },
    references: String,
    latitude: Number,
    longitude: Number,
    token: {
        type: String,
        unique: true,
        required: true,
        select: false
    },
    last_login: Date,
    created_at: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

module.exports = mongoose.model('client_user', clientSchema);