const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ctpmanSchema = new Schema({
    id_tpuser: { type: Number },
    name: { type: String },
    description: { type: String },
    user_type: { type: String },
    admin: { type: Boolean },
    phone_number: { type: Number }
});

module.exports = mongoose.model('company_third_party', ctpmanSchema);