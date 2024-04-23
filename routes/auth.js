const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');

// POST signup
router.post('/signup', [
    body('username').isEmail().withMessage('Username must be a valid email'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').trim().not().isEmpty().withMessage('Role is required'),
], authController.signup);

// POST login
router.post('/login', [
    body('username').trim().not().isEmpty().withMessage('Username is required'),
    body('password').trim().not().isEmpty().withMessage('Password is required'),
], authController.login);

module.exports = router;