const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restUserSchema = new Schema({
    Id_username:{type: Number, required: true},
    Id_rest_Working : {
        type : Number,
        required: true
    },
    Username: {
        type: Number, 
        required: true
    },   
    Admin: {
        type: Boolean,
        required: true
    },
    Name : {type: String, required: true},
    Last_name: String,
});

module.exports = mongoose.model('restUser', restUserSchema);