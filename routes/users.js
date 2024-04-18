const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const usersController = require('../controllers/usersController');
const { authenticateToken } = require('../utilities/auth');

// GET all users - secured
router.get('/', authenticateToken, usersController.getAllUsers);

// POST a new user - secured and validated
router.post('/', authenticateToken, [
    body('username').trim().not().isEmpty().withMessage('Username is required'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').trim().not().isEmpty().withMessage('Role is required'),
], usersController.createUser);

// GET a single user by ID - secured
router.get('/:id', authenticateToken, usersController.getUserById);

// PUT update a user by ID - secured and validated
router.put('/:id', authenticateToken, [
    body('username').trim().not().isEmpty().withMessage('Username is required'),
    body('password').optional().trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').trim().not().isEmpty().withMessage('Role is required'),
], usersController.updateUser);

// DELETE a user by ID - secured
router.delete('/:id', authenticateToken, usersController.deleteUser);

module.exports = router;