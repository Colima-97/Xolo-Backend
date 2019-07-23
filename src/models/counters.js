const mongoose = require('mongoose')
const Schema = mongoose.Schema

const countersSchema = new Schema({
    id_order: String,
    seq: Number
});

module.exports = mongoose.model('counters', countersSchema);