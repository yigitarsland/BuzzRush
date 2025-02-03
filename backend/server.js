const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/users');
const vendorRoutes = require('./routes/vendors');
const orderRoutes = require('./routes/orders');
const courierRoutes = require('./routes/couriers');
const productsRoute = require('./routes/products');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/couriers', courierRoutes);
app.use('/api/products', productsRoute);

// Connect to MongoDB using the Atlas connection URI
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const paymentsRoute = require('./routes/payments');
app.use('/api/payments', paymentsRoute);
