const db = require('../config/database');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, role } = req.body;
    const sql = 'INSERT INTO Users (username, password, role) VALUES (?, ?, ?)';
    db.query(sql, [username, password, role], (error, results) => {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: "Username already exists" });
            }
            return res.status(500).json({ message: "Error creating user", error });
        }
        res.status(201).json({ message: "User created successfully", user_id: results.insertId });
    });
};

exports.login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const sql = 'SELECT * FROM Users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Error logging in", error });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const user = results[0];
        const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET);
        res.status(200).json({ message: "Login successful", token });
    });
};