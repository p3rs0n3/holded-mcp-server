const { StatusCodes } = require('http-status-codes');
const holdedService = require('../services/holded.service');

const getEvents = async (req, res) => {
  try {
    const events = await holdedService.getAppointments(); // Using same endpoint as appointments
    res.status(StatusCodes.OK).json(events);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching events',
      error: error.message
    });
  }
};

module.exports = {
  getEvents
};