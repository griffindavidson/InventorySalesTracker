const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const suppliersController = require('../controllers/suppliersController');
const { authenticateToken } = require('../utilities/auth');

// GET all suppliers - secured
router.get('/', authenticateToken, suppliersController.getAllSuppliers);

// POST a new supplier - secured and validated
router.post('/', authenticateToken, [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('contact_info').trim().not().isEmpty().withMessage('Contact info is required'),
    body('payment_terms').trim().not().isEmpty().withMessage('Payment terms are required'),
], suppliersController.createSupplier);

// GET a single supplier by ID - secured
router.get('/:id', authenticateToken, suppliersController.getSupplierById);

// PUT update a supplier by ID - secured and validated
router.put('/:id', authenticateToken, [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('contact_info').trim().not().isEmpty().withMessage('Contact info is required'),
    body('payment_terms').trim().not().isEmpty().withMessage('Payment terms are required'),
], suppliersController.updateSupplier);

// DELETE a supplier by ID - secured
router.delete('/:id', authenticateToken, suppliersController.deleteSupplier);
module.exports = router;