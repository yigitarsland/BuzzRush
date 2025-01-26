const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    category: { type: String, required: true }, // alcohol, e-cigarettes, etc.
    stock: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);
