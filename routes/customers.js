const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const customersController = require('../controllers/customersController');
const { authenticateToken } = require('../utilities/auth');

// GET all customers - secured
router.get('/', authenticateToken, customersController.getAllCustomers);

// POST a new customer - secured and validated
router.post('/', authenticateToken, [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('contact_info').trim().not().isEmpty().withMessage('Contact info is required'),
], customersController.createCustomer);

// GET a single customer by ID - secured
router.get('/:id', authenticateToken, customersController.getCustomerById);

// PUT update a customer by ID - secured and validated
router.put('/:id', authenticateToken, [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('contact_info').trim().not().isEmpty().withMessage('Contact info is required'),
], customersController.updateCustomer);

// DELETE a customer by ID - secured
router.delete('/:id', authenticateToken, customersController.deleteCustomer);

module.exports = router;