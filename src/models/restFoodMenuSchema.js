const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restFoodSchema = new Schema({
    Id_food: {
        type : Number,
        required : true
    },
    Name: {
        type : String,
        required : true
    },
    Description: String,
    Weight: {
        type : Number,
        required : true
    },
    Price: {
        type : Number,
        required : true
    },
    Status: {
        type : Boolean,
        required : true
    },
    Picture: String
});

const restFoodMenuSchema = new Schema({
    Id_menu : {
        type : Number,
        required : true
    },
    Id_restaurant : {
        type : Number,
        required : true
    },
    Category : String,
    Menu_type : {
        type : Boolean,
        default : 0
    },
    food: [restFoodSchema]
});

module.exports = mongoose.model('food_menu', restFoodMenuSchema);