const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    id_order: { type: Number },
    id_restaurant: { type: Number },
    id_deliveryman: { type: Number },
    id_client: { type: Number },
    status: { type: String },
    order_date: { type: Date, default: Date.now },
    id_food: { type: Array(Number) },
    food_price: { type: Array(Number) },
    subtotal: { type: Number },
    commission: { type: Number },
    total_price: { type: Number },
    client_address: { type: String }
});

module.exports = mongoose.model('orders', ordersSchema);