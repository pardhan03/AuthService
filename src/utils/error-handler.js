const { StatusCodes } = require('http-status-codes');

class AppError extends Error {
    constructor(
        name = 'ServerError',
        message = 'Something went wrong!',
        explanation = 'Something went wrong!',
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    ) {
        super();
        this.message = message,
        this.name = name,
        this.explanation = explanation,
        this.StatusCode = statusCode
    }
};

module.exports = AppError;