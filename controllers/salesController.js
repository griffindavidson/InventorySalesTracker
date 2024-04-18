const db = require('../config/database');
const { validationResult } = require('express-validator');

exports.getAllSales = (req, res) => {
    db.query('SELECT * FROM Sales', (error, results) => {
        if (error) {
            console.error('Error fetching sales:', error);
            return res.status(500).json({ message: "Error fetching sales", error });
        }
        console.log('Database results:', results);
        res.status(200).json(results);
    });
};

exports.createSale = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { date, customer_id, total_amount } = req.body;
    const sql = 'INSERT INTO Sales (date, customer_id, total_amount) VALUES (?, ?, ?)';
    db.query(sql, [date, customer_id, total_amount], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error creating sale", error });
        }
        res.status(201).json({ message: "Sale created successfully", sale_id: results.insertId });
    });
};

exports.getSaleById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Sales WHERE sale_id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error fetching sale", error });
        }
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: "Sale not found" });
        }
    });
};

exports.updateSale = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { date, customer_id, total_amount } = req.body;
    const sql = 'UPDATE Sales SET date = ?, customer_id = ?, total_amount = ? WHERE sale_id = ?';
    db.query(sql, [date, customer_id, total_amount, id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Error updating sale", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.status(200).json({ message: "Sale updated successfully" });
    });
};

exports.deleteSale = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Sales WHERE sale_id = ?', [id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Error deleting sale", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.status(200).json({ message: "Sale deleted successfully" });
    });
};