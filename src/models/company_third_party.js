'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const ctpmanSchema = new Schema({
    id_tpuser: { type: Number, unique: true },
    name: { type: String, required: true },
    ctp_code: {type: String, required: true},
    description: { type: String , required: true},
    user_type: { type: String, default: 'third party', lowercase: true },
    admin: { type: Boolean, required: true },
    phone_number: { type: Number, phone_number: true },
    password: {type: String, select: false, required: true},
    signUpDate: { type: Date, default: Date.now },
    lastLogin: Date
});

ctpmanSchema.pre('save', (next) => {
    let ctpUser = this

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(ctpUser.password, salt, null, (err, hash) => {
            if(err) return next(err)

            ctpUser.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('company_third_party', ctpmanSchema);