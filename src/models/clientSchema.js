const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    id_client: {
        type: Number, 
        required: true
    },
    username: {
        type: Number,
        index: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    name: {
        type: String, 
        required: true
    },
    last_name: String,
    user_type: {
        type: String, 
        required: true,
        lowercase: true,
        enum: ['client', 'deliveryman', 'restaurant', 'third party']
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: /\S+@\S+\.\S+/
    },
    address:{
        type: String,
        required: true      
    },
    number_address:{
        type: Number,
        required: true
    },
    latitude:{
        type: Number
    },
    longitude:{
        type: Number
    }
});

module.exports = mongoose.model('client_user', clientSchema);