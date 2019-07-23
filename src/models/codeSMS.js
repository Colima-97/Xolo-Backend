'use stric'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const codeSMSSchema = new Schema({
    codeSMS: { type: Number, unique: true}
});

module.exports = mongoose.model('codesms', codeSMSSchema);