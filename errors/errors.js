const { BadRequestError } = require('./badRequestError');
const { NotFoundError } = require('./notFoundError');
const { ServerError } = require('./serverError');

module.exports = {
    BadRequestError, NotFoundError, ServerError,
};
