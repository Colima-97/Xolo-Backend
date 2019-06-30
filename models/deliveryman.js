const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeliverymanSchema = new Schema({
    id_deliveryman: { type: Number },
    name: { type: String },
    last_name: { type: String },
    user_type: { type: String },
    deliveryman_type: { type: String },
    address: { type: String },
    phone_number: { type: Number }
});

module.exports = mongoose.model('deliveryman', DeliverymanSchema);