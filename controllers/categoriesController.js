const db = require('../config/database');
const { validationResult } = require('express-validator');

exports.getAllCategories = (req, res) => {
    db.query('SELECT * FROM Categories', (error, results) => {
        if (error) {
            console.error('Error fetching categories:', error);
            return res.status(500).json({ message: "Error fetching categories", error });
        }
        console.log('Database results:', results);
        res.status(200).json(results);
    });
};

exports.createCategory = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;
    const sql = 'INSERT INTO Categories (name, description) VALUES (?, ?)';
    db.query(sql, [name, description], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error creating category", error });
        }
        res.status(201).json({ message: "Category created successfully", category_id: results.insertId });
    });
};

exports.getCategoryById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Categories WHERE category_id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error fetching category", error });
        }
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    });
};

exports.updateCategory = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, description } = req.body;
    const sql = 'UPDATE Categories SET name = ?, description = ? WHERE category_id = ?';
    db.query(sql, [name, description, id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Error updating category", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category updated successfully" });
    });
};

exports.deleteCategory = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Categories WHERE category_id = ?', [id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Error deleting category", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    });
};