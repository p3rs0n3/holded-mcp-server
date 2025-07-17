const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const contactsController = require('../controllers/contacts.controller');

// Validation middleware
const validateContact = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Invalid email'),
  body('phone').optional().isString().withMessage('Invalid phone number'),
  body('address').optional().isString().withMessage('Address must be a string')
];

const validateContactId = [
  param('id').isString().withMessage('Invalid contact ID')
];

// Routes
router.get('/', contactsController.getContacts);
router.get('/:id', validateContactId, contactsController.getContactById);
router.post('/', validateContact, contactsController.createContact);

module.exports = router;