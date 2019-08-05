const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    Id_client : {
        type: Number, 
        required: true
    },
    Username: {
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
    Name : {
        type: String, 
        required: true
    },
    Last_name: String,
    User_type: {
        type: String, 
        required: true,
        lowercase: true,
        enum: ['client', 'deliveryman', 'restaurant', 'third party']
    },
    Email: {
        type: String,
        required: true,
        lowercase: true,
        match: /\S+@\S+\.\S+/
    },
    Address:{
        type: String,
        required: true      
    },
    NumberAddress:{
        type: Number,
        required: true
    },
    Latitude:{
        type: Number
    },
    Longitude:{
        type: Number
    }
});

module.exports = mongoose.model('client_user', clientSchema);