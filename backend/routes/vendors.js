const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const Product = require('../models/Product'); // For linking products to vendors

// POST: Create a new vendor
router.post('/create', async (req, res) => {
    const { name, products, location } = req.body;

    try {
        const newVendor = new Vendor({ name, products, location });
        await newVendor.save();
        res.status(201).json({ message: 'Vendor created', vendor: newVendor });
    } catch (err) {
        res.status(500).json({ message: 'Error creating vendor', error: err });
    }
});

// GET: Fetch all vendors
router.get('/', async (req, res) => {
    try {
        const vendors = await Vendor.find().populate('products'); // Populate product data
        res.status(200).json(vendors);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching vendors', error: err });
    }
});

// GET: Fetch a vendor by ID
router.get('/:id', async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id).populate('products');
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json(vendor);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching vendor', error: err });
    }
});

// PUT: Update a vendor by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json(updatedVendor);
    } catch (err) {
        res.status(500).json({ message: 'Error updating vendor', error: err });
    }
});

// DELETE: Delete a vendor by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!deletedVendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json({ message: 'Vendor deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting vendor', error: err });
    }
});

module.exports = router;
