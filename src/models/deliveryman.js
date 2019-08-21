'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const DeliverymanSchema = new Schema({
    id_deliveryman: { type: Number, unique: true },
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    user_type: { type: String, default: "deliveryman" },
    deliveryman_type: { type: String, required: true, lowercase: true },
    address: { type: String, required: true },
    phone_number: { type: Number, unique:true, required: true },
    password: {type: String, select: false, required: true, lowercase: true},
    code: {type: String, required: true},
    signUpDate: { type: Date, default: Date.now },
    lastLogin: Date, 
    status: { type: String, default: 'pendiente', lowercase: true}
});

DeliverymanSchema.pre('save', (next) => {
    let deliverymanUser = this

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(deliverymanUser.password, salt, null, (err, hash) => {
            if(err) return next(err)

            deliverymanUser.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('deliveryman', DeliverymanSchema);