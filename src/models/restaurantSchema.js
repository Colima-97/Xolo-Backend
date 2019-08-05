const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    Id_restaurant : {
        type: Number,
        required: true
    },
    Restaurant_name : {
        type: String,
        required : true
    },
    rest_code: {
        type: String,
        required: true,
        unique: true
    },   
    Description : String,
    Min_amount: {
        type : Number,
        required : true,
        default : 0
    },        
    rest_Phone_number: {
        type : Number
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

module.exports = mongoose.model('restaurant', restaurantSchema);