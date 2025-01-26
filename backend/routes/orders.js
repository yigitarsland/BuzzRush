const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Assuming the model is in models/Order.js
const Product = require('../models/Product'); // Assuming Product model has a price field

// Create an order with transaction details
router.post('/', async (req, res) => {
    try {
        const { user, vendor, products, status, courier, transactionId, paymentMethod, paymentStatus, paymentDate } = req.body;

        // Calculate the total price by summing up the price * quantity for each product
        let totalPrice = 0;
        for (let item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(400).json({ error: `Product with ID ${item.product} not found` });
            }
            totalPrice += product.price * item.quantity;  // price * quantity for each product
        }

        const newOrder = new Order({
            user,
            vendor,
            products,
            totalPrice,
            status,
            courier,
            transactionId,
            paymentMethod,
            paymentStatus,
            paymentDate
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('user vendor courier products.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Get a single order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user vendor courier products.product');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Update an order by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Update payment status of an order by ID
router.put('/:id/payment', async (req, res) => {
    try {
        const { paymentStatus, paymentDate } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { paymentStatus, paymentDate },
            { new: true }
        );

        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Payment status updated', order: updatedOrder });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;