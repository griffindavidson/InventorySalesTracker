const db = require('../config/database');
const { validationResult } = require('express-validator');

exports.getAllInventoryItems = (req, res) => {
    db.query('SELECT * FROM Inventory', (error, results) => {
        if (error) {
            console.error('Error fetching inventory items:', error);
            return res.status(500).json({ message: "Error fetching inventory items", error });
        }
        console.log('Database results:', results);
        res.status(200).json(results);
    });
};

exports.createInventoryItem = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { product_id, quantity, location } = req.body;
    const sql = 'INSERT INTO Inventory (product_id, quantity, location) VALUES (?, ?, ?)';
    db.query(sql, [product_id, quantity, location], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error creating inventory item", error });
        }
        res.status(201).json({ message: "Inventory item created successfully", inventory_id: results.insertId });
    });
};

exports.getInventoryItemById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Inventory WHERE inventory_id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error fetching inventory item", error });
        }
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: "Inventory item not found" });
        }
    });
};

exports.updateInventoryItem = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { product_id, quantity, location } = req.body;
    const sql = 'UPDATE Inventory SET product_id = ?, quantity = ?, location = ? WHERE inventory_id = ?';
    db.query(sql, [product_id, quantity, location, id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Error updating inventory item", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Inventory item not found" });
        }
        res.status(200).json({ message: "Inventory item updated successfully" });
    });
};

exports.deleteInventoryItem = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Inventory WHERE inventory_id = ?', [id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Error deleting inventory item", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Inventory item not found" });
        }
        res.status(200).json({ message: "Inventory item deleted successfully" });
    });
};