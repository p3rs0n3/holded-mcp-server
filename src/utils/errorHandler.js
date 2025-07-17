const { StatusCodes } = require('http-status-codes');
const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: err.message
    });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: 'Something went wrong on the server'
  });
};

module.exports = errorHandler;