const { StatusCodes } = require('http-status-codes');
const holdedService = require('../services/holded.service');

const getServices = async (req, res) => {
  try {
    const services = await holdedService.getServices();
    res.status(StatusCodes.OK).json(services);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching services',
      error: error.message
    });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await holdedService.getServiceById(req.params.id);
    if (!service) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Service not found'
      });
    }
    res.status(StatusCodes.OK).json(service);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching service',
      error: error.message
    });
  }
};

module.exports = {
  getServices,
  getServiceById
};