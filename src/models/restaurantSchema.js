const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    id_restaurant : {
        type: Number,
        required: true
    },
    restaurant_name : {
        type: String,
        required : true
    },
    rest_code: {
        type: String,
        required: true,
        unique: true
    },   
    description : String,
    min_amount: {
        type : Number,
        required : true,
        default : 0
    },        
    rest_phone_number: {
        type : Number
    },
    email: {
        type: String,
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

module.exports = mongoose.model('restaurant', restaurantSchema);