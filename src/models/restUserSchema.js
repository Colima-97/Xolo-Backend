const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restUserSchema = new Schema({
    id_username:{
        type: Number, 
        required: true
    },
    id_rest_working: {
        type : Number,
        required: true
    },
    rest_name_working: {
        type: String,
        required: true
    },    
    code: {
        type: String,
        required: true        
    },    
    username: {
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
    admin: {
        type: Boolean,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    last_name: String,
});

module.exports = mongoose.model('rest_user', restUserSchema);