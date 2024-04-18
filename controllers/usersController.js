const db = require('../config/database');
const { validationResult } = require('express-validator');

exports.getAllUsers = (req, res) => {
    db.query('SELECT * FROM Users', (error, results) => {
        if (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ message: "Error fetching users", error });
        }
        console.log('Database results:', results);
        res.status(200).json(results);
    });
};

exports.createUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, role } = req.body;
    const sql = 'INSERT INTO Users (username, password, role) VALUES (?, ?, ?)';
    db.query(sql, [username, password, role], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error creating user", error });
        }
        res.status(201).json({ message: "User created successfully", user_id: results.insertId });
    });
};

exports.getUserById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Users WHERE user_id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error fetching user", error });
        }
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    });
};

exports.updateUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { username, password, role } = req.body;
    const sql = 'UPDATE Users SET username = ?, password = ?, role = ? WHERE user_id = ?';
    db.query(sql, [username, password, role, id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Error updating user", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
    });
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Users WHERE user_id = ?', [id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Error deleting user", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    });
};