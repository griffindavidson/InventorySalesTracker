const express = require('express');
const app = express();

// Require dotenv to use environment variables
require('dotenv').config();

// Require the database connection
const db = require('./config/database');

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const productRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');
const inventoryRoutes = require('./routes/inventory');
const customersRoutes = require('./routes/customers');
const salesRoutes = require('./routes/sales');
const saleItemsRoutes = require('./routes/sale_items');
const suppliersRoutes = require('./routes/suppliers');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

// Test database connection by querying some data
app.get('/testdb', (req, res) => {
    db.query('SELECT 1 + 1 AS solution', (error, results) => {
        if (error) throw error;
        res.send(`Database connected, test query returned: ${results[0].solution}`);
    });
});

app.use(express.static('public'));

// Basic route to confirm the server is working
app.get('/', (req, res) => {
    res.send('Hello World! The server is up and running.');
});

// Use routes with a base API path
app.use('/api/products', productRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/sale-items', saleItemsRoutes);
app.use('/api/suppliers', suppliersRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});