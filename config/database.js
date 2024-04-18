// config/database.js
require('dotenv').config();
const mysql = require('mysql2');

// Creates a MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Connects to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ' + err.message);
        return;
    }
    console.log('Successfully connected to the database.');
});

// Export the database connection
module.exports = db;
