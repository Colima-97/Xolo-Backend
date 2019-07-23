const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ordersSchema = new Schema({
    id_order: { type: Number, unique: true },
    id_restaurant: { type: Number, required: true },
    id_deliveryman: { type: Number, required: true },
    id_client: { type: Number, required: true },
    status: { type: String, required: true },
    order_date: { type: Date, default: Date.now },
    id_food: { type: Array(Number), required: true },
    food_price: { type: Array(Number), required: true },
    subtotal: { type: Number, required: true },
    commission: { type: Number, required: true },
    total_price: { type: Number, required: true },
    client_address: { type: String, required: true }
});

module.exports = mongoose.model('orders', ordersSchema);