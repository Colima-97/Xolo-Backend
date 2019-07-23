const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nfdoSchema = new Schema({
    id_deliveryman: { type: Number },
    id_restaurant: { type: Number },
    id_tpuser: { type: Number },
    order_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('no_fixed_deliveryman_orders', nfdoSchema);