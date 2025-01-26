const express = require('express');
const router = express.Router();
const Courier = require('../models/Courier');

// POST: Create a new courier
router.post('/', async (req, res) => {
    const { name, phone, available } = req.body;

    try {
        const newCourier = new Courier({ name, phone, available });
        await newCourier.save();
        res.status(201).json({ message: 'Courier created', courier: newCourier });
    } catch (err) {
        res.status(500).json({ message: 'Error creating courier', error: err });
    }
});

// GET: Fetch all couriers
router.get('/', async (req, res) => {
    try {
        const couriers = await Courier.find();
        res.status(200).json(couriers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching couriers', error: err });
    }
});

// GET: Fetch a courier by ID
router.get('/:id', async (req, res) => {
    try {
        const courier = await Courier.findById(req.params.id);
        if (!courier) {
            return res.status(404).json({ message: 'Courier not found' });
        }
        res.status(200).json(courier);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching courier', error: err });
    }
});

// PUT: Update a courier by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCourier = await Courier.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourier) {
            return res.status(404).json({ message: 'Courier not found' });
        }
        res.status(200).json(updatedCourier);
    } catch (err) {
        res.status(500).json({ message: 'Error updating courier', error: err });
    }
});

// DELETE: Delete a courier by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCourier = await Courier.findByIdAndDelete(req.params.id);
        if (!deletedCourier) {
            return res.status(404).json({ message: 'Courier not found' });
        }
        res.status(200).json({ message: 'Courier deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting courier', error: err });
    }
});

module.exports = router;
