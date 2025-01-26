const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Vendor = require('../models/Vendor'); // For linking to vendor

// POST: Create a new product
router.post('/', async (req, res) => {
    const { name, description, price, vendor, category, stock } = req.body;

    try {
        const newProduct = new Product({ name, description, price, vendor, category, stock });

        // Ensure that the vendor exists before associating the product
        const vendorExists = await Vendor.findById(vendor);
        if (!vendorExists) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        // Save the product
        await newProduct.save();

        // Add the product to the vendor's product list
        vendorExists.products.push(newProduct._id);
        await vendorExists.save();

        res.status(201).json({ message: 'Product created', product: newProduct });
    } catch (err) {
        res.status(500).json({ message: 'Error creating product', error: err });
    }
});

// GET: Fetch all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('vendor'); // Populate vendor info
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err });
    }
});

// GET: Fetch a product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('vendor');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product', error: err });
    }
});

// PUT: Update a product by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err });
    }
});

// DELETE: Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Also remove the product from the associated vendor's product list
        const vendor = await Vendor.findById(deletedProduct.vendor);
        vendor.products.pull(deletedProduct._id);
        await vendor.save();

        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err });
    }
});

module.exports = router;
