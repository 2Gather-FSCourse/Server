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
            if (!donations || donations.length === 0) throw new NotFoundError('didnt found any donations');
            res.status(200).json(donations);
        } catch (error) {
            next(error);
        }
    },
    async getDonationById(req, res, next) {
        const { donationId } = req.params;
        try {
            const isId = mongoose.isValidObjectId(donationId);
            if (!isId) throw new BadRequestError('id in get donation by id');
            const donation = await retrieveDonation(donationId);
            if (!donation || donation.length === 0) throw new NotFoundError(`Donation with id <${donationId}>`);
            res.status(200).json(donation);
        } catch (error) {
            next(error);
        }
    },

    async addDonation(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) throw new BadRequestError('add donation');
            const newDonation = await createDonation(req.body);
            res.status(200).json(newDonation);
        } catch (error) {
            if (error.name === 'ValidationError') {
                error.status = 400;
            }
            next(error);
        }
    },

    async deleteDonation(req, res, next) {
        try {
            const { donationId } = req.params;
            const isId = mongoose.isValidObjectId(donationId);
            if (!isId) throw new BadRequestError('id in delete donation');
            const deletedDonation = await deleteDonation(donationId);
            if (!deletedDonation || deletedDonation.length === 0) throw new NotFoundError(`Donation with id <${donationId}>`);
            res.status(200).json(deletedDonation);
        } catch (error) {
            if (error.name === 'ValidationError') {
                error.status = 400;
            }
            next(error);
        }
    },

    async updateDonation(req, res, next) {
        try {
            const { donationId } = req.params;
            const isId = mongoose.isValidObjectId(donationId);
            if (!isId) throw new BadRequestError('id');
            if (Object.keys(req.body).length === 0) throw new BadRequestError('update donation');
            const updatedDonation = await updateDonation(donationId, req.body);
            if (!updatedDonation || updatedDonation.length === 0) throw new NotFoundError(`Donation with id <${donationId}>`);
            res.status(200).json(updatedDonation);
        } catch (error) {
            next(error);
        }
    },
}
