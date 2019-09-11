const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    id_client:{
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    user_type: {
        type: String, 
        default: 'Client',
        enum: ['Client', 'Deliveryman', 'RestaurantAdmin', 'RestaurantEmployee', 'ThirdParty']
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: /\S+@\S+\.\S+/
    },
    //Address
    street: String,
    external_number: String,
    internal_number: String,
    neighborhood: String,
    city: String,
    zip_code: Number,
    references: String,
    //End
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

/*
Validations
Validación del correo.
Validación de teléfono.
Validación de dirección en caso de que no se den los permisos de geolocalización.
Validaciones de objetos nulos y requeridos.
*/