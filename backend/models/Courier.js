const mongoose = require('mongoose');

const courierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Courier', courierSchema);
