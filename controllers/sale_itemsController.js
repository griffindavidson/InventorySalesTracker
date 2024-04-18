const db = require('../config/database');
const { validationResult } = require('express-validator');

exports.getAllSaleItems = (req, res) => {
    db.query('SELECT * FROM Sale_Items', (error, results) => {
        if (error) {
            console.error('Error fetching sale items:', error);
            return res.status(500).json({ message: "Error fetching sale items", error });
        }
        console.log('Database results:', results);
        res.status(200).json(results);
    });
};

exports.createSaleItem = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { sale_id, product_id, quantity, price } = req.body;
    const sql = 'INSERT INTO Sale_Items (sale_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
    db.query(sql, [sale_id, product_id, quantity, price], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error creating sale item", error });
        }
        res.status(201).json({ message: "Sale item created successfully", sale_item_id: results.insertId });
    });
};

exports.getSaleItemById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Sale_Items WHERE sale_item_id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error fetching sale item", error });
        }
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: "Sale item not found" });
        }
    });
};

exports.updateSaleItem = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { sale_id, product_id, quantity, price } = req.body;
    const sql = 'UPDATE Sale_Items SET sale_id = ?, product_id = ?, quantity = ?, price = ? WHERE sale_item_id = ?';
    db.query(sql, [sale_id, product_id, quantity, price, id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Error updating sale item", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Sale item not found" });
        }
        res.status(200).json({ message: "Sale item updated successfully" });
    });
};

exports.deleteSaleItem = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Sale_Items WHERE sale_item_id = ?', [id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Error deleting sale item", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Sale item not found" });
        }
        res.status(200).json({ message: "Sale item deleted successfully" });
    });
};