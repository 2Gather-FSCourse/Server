const mongoose = require('mongoose');
const { NotFoundError, BadRequestError } = require('../errors/errors');
const {
    findDonations,
    retrieveDonation,
    createDonation,
    updateDonation,
    deleteDonation,
} = require('../repositories/donationsRepository');


exports.donationsController = {
    async getAllDonations(req, res, next) {
        try {
            const donations = await findDonations();
            if (!donations || donations.length === 0) throw new NotFoundError('donations');
            res.status(200).json(donations);
        } catch (error) {
            next(error);
        }
    },
}
