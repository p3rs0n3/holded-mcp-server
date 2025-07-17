const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const appointmentsController = require('../controllers/appointments.controller');

// Validation middleware
const validateAppointment = [
  body('title').notEmpty().withMessage('Title is required'),
  body('startDate').isISO8601().withMessage('Invalid start date'),
  body('endDate').isISO8601().withMessage('Invalid end date'),
  body('contactId').optional().isString().withMessage('Invalid contact ID'),
  body('serviceId').optional().isString().withMessage('Invalid service ID'),
  body('notes').optional().isString().withMessage('Notes must be a string')
];

const validateAppointmentId = [
  param('id').isString().withMessage('Invalid appointment ID')
];

// Routes
router.get('/', appointmentsController.getAppointments);
router.get('/:id', validateAppointmentId, appointmentsController.getAppointmentById);
router.post('/', validateAppointment, appointmentsController.createAppointment);
router.put('/:id', [...validateAppointmentId, ...validateAppointment], appointmentsController.updateAppointment);
router.delete('/:id', validateAppointmentId, appointmentsController.deleteAppointment);

module.exports = router;