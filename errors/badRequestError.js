class BadRequestError extends Error {
    constructor(element) {
        super(`please provide: ${element} in the correct format`);
        this.name = 'BadRequestError';
        this.status = 400;
    }
}

module.exports = { BadRequestError };
