const db = require('../config/database');
const { validationResult } = require('express-validator');

exports.getAllCustomers = (req, res) => {
    db.query('SELECT * FROM Customers', (error, results) => {
        if (error) {
            console.error('Error fetching customers:', error);
            return res.status(500).json({ message: "Error fetching customers", error });
        }
        console.log('Database results:', results);
        res.status(200).json(results);
    });
};

exports.createCustomer = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, contact_info, purchase_hist } = req.body;
    const sql = 'INSERT INTO Customers (name, contact_info, purchase_hist) VALUES (?, ?, ?)';
    db.query(sql, [name, contact_info, purchase_hist], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error creating customer", error });
        }
        res.status(201).json({ message: "Customer created successfully", customer_id: results.insertId });
    });
};

exports.getCustomerById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Customers WHERE customer_id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error fetching customer", error });
        }
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: "Customer not found" });
        }
    });
};

exports.updateCustomer = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, contact_info, purchase_hist } = req.body;
    const sql = 'UPDATE Customers SET name = ?, contact_info = ?, purchase_hist = ? WHERE customer_id = ?';
    db.query(sql, [name, contact_info, purchase_hist, id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Error updating customer", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ message: "Customer updated successfully" });
    });
};

exports.deleteCustomer = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Customers WHERE customer_id = ?', [id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Error deleting customer", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ message: "Customer deleted successfully" });
    });
};