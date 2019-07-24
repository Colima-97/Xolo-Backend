const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nfdoSchema = new Schema({
    idOrder: { type: Number, unique: true },
    id_deliveryman: { type: Number, required: true },
    id_restaurant: { type: Number, required: true },
    id_tpuser: { type: Number, required: true },
    status: { type: String, required: true },
    order_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('no_fixed_deliveryman_orders', nfdoSchema);