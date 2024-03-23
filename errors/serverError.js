class ServerError extends Error {
    constructor(action) {
        super(`Internal Server Error - Couldn't ${action} report`);
        this.name = 'ServerError';
        this.status = 500;
    }
}
module.exports = { ServerError };
