const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restFoodSchema = new Schema({
    id_food: {
        type : Number,
        required : true
    },
    name: {
        type : String,
        required : true
    },
    description: String,
    weight: {
        type : Number,
        required : true
    },
    price: {
        type : Number,
        required : true
    },
    status: {
        type : Boolean,
        required : true
    },
    picture: String
});

const restFoodMenuSchema = new Schema({
    id_menu : {
        type : Number,
        required : true
    },
    id_restaurant : {
        type : Number,
        required : true
    },
    category : String,
    menu_type : {
        type : Boolean,
        default : 0
    },
    food: [restFoodSchema]
});

module.exports = mongoose.model('food_menu', restFoodMenuSchema);