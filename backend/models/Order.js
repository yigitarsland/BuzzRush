const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    courier: { type: mongoose.Schema.Types.ObjectId, ref: 'Courier' },
    createdAt: { type: Date, default: Date.now },

    // Transaction details
    transactionId: { type: String, required: true },  // Unique identifier for the transaction
    paymentMethod: { type: String, enum: ['credit_card', 'debit_card', 'paypal', 'stripe'], required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    paymentDate: { type: Date },  // Date of payment (if completed)
});

module.exports = mongoose.model('Order', orderSchema);
