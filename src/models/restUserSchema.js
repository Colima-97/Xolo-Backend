const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restUserSchema = new Schema({
    Id_username:{
        type: Number, 
        required: true
    },
    Id_rest_Working: {
        type : Number,
        required: true
    },
    rest_Name_Working: {
        type: String,
        required: true
    },    
    code: {
        type: String,
        required: true        
    },    
    Username: {
        type: Number, 
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    user_type: {
        type: String, 
        required: true,
        lowercase: true,
        enum: ['client', 'deliveryman', 'restaurant', 'third party']
    },   
    Admin: {
        type: Boolean,
        required: true
    },
    Name: {
        type: String, 
        required: true
    },
    Last_name: String,
});

module.exports = mongoose.model('restUser', restUserSchema);