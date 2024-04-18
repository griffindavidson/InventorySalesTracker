const db = require('../config/database');
const { validationResult } = require('express-validator');

exports.getAllProducts = (req, res) => {
    db.query('SELECT * FROM Products', (error, results) => {
        if (error) {
            console.error('Error fetching products:', error);
            return res.status(500).json({ message: "Error fetching products", error });
        }
        console.log('Database results:', results);
        res.status(200).json(results);
    });
};

exports.createProduct = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, category_id, supplier_id, price, stock_level } = req.body;
    const sql = 'INSERT INTO Products (name, description, category_id, supplier_id, price, stock_level) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, description, category_id, supplier_id, price, stock_level], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error creating product", error });
        }
        res.status(201).json({ message: "Product created successfully", product_id: results.insertId });
    });
};

exports.getProductById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Products WHERE product_id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error fetching product", error });
        }
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    });
};

exports.updateProduct = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, description, category_id, supplier_id, price, stock_level } = req.body;
    const sql = 'UPDATE Products SET name = ?, description = ?, category_id = ?, supplier_id = ?, price = ?, stock_level = ? WHERE product_id = ?';
    db.query(sql, [name, description, category_id, supplier_id, price, stock_level, id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Error updating product", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully" });
    });
};

exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Products WHERE product_id = ?', [id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Error deleting product", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    });
};
