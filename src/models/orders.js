const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ordersSchema = new Schema({
    id_order: { type: Number, unique: true },
    id_restaurant: { type: Number, required: true },
    name_restaurant: String,
    rest_phone_number: Number,
    id_deliveryman: { type: Number, required: true },
    name_deliveryman: String,
    deliveryman_phone_number: Number,
    deliveryman_type: String,
    id_company_third_party: Number,
    id_client: { type: Number, required: true },
    name_client: String,
    client_phone_number: Number,
    status: { type: String, default: 'Preparación' },
    order_date: { type: Date, default: Date.now },
    id_food: { type: Array(Number), required: true },
    food_price: { type: Array(Number), required: true },
    subtotal: { type: Number, required: true },
    commission: { type: Number, required: true },
    total_price: { type: Number, required: true },
    client_address: String
});

module.exports = mongoose.model('orders', ordersSchema);