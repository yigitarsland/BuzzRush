const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    location: { type: String, required: true }
});

module.exports = mongoose.model('Vendor', vendorSchema);
