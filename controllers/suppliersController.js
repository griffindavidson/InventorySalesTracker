const db = require('../config/database');
const { validationResult } = require('express-validator');

exports.getAllSuppliers = (req, res) => {
    db.query('SELECT * FROM Suppliers', (error, results) => {
        if (error) {
            console.error('Error fetching suppliers:', error);
            return res.status(500).json({ message: "Error fetching suppliers", error });
        }
        console.log('Database results:', results);
        res.status(200).json(results);
    });
};

exports.createSupplier = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, contact_info, payment_terms } = req.body;
    const sql = 'INSERT INTO Suppliers (name, contact_info, payment_terms) VALUES (?, ?, ?)';
    db.query(sql, [name, contact_info, payment_terms], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error creating supplier", error });
        }
        res.status(201).json({ message: "Supplier created successfully", supplier_id: results.insertId });
    });
};

exports.getSupplierById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Suppliers WHERE supplier_id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error fetching supplier", error });
        }
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: "Supplier not found" });
        }
    });
};

exports.updateSupplier = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, contact_info, payment_terms } = req.body;
    const sql = 'UPDATE Suppliers SET name = ?, contact_info = ?, payment_terms = ? WHERE supplier_id = ?';
    db.query(sql, [name, contact_info, payment_terms, id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Error updating supplier", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json({ message: "Supplier updated successfully" });
    });
};

exports.deleteSupplier = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Suppliers WHERE supplier_id = ?', [id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Error deleting supplier", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json({ message: "Supplier deleted successfully" });
    });
};