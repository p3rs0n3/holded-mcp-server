const { StatusCodes } = require('http-status-codes');
const holdedService = require('../services/holded.service');
const { validationResult } = require('express-validator');

const getAppointments = async (req, res) => {
  try {
    const appointments = await holdedService.getAppointments();
    res.status(StatusCodes.OK).json(appointments);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching appointments',
      error: error.message
    });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await holdedService.getAppointmentById(req.params.id);
    if (!appointment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Appointment not found'
      });
    }
    res.status(StatusCodes.OK).json(appointment);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching appointment',
      error: error.message
    });
  }
};

const createAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  try {
    const newAppointment = await holdedService.createAppointment(req.body);
    res.status(StatusCodes.CREATED).json(newAppointment);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error creating appointment',
      error: error.message
    });
  }
};

const updateAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  try {
    const updatedAppointment = await holdedService.updateAppointment(
      req.params.id,
      req.body
    );
    res.status(StatusCodes.OK).json(updatedAppointment);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error updating appointment',
      error: error.message
    });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    await holdedService.deleteAppointment(req.params.id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error deleting appointment',
      error: error.message
    });
  }
};

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
};