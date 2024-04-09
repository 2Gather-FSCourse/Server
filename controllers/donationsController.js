const mongoose = require('mongoose');
const {NotFoundError, BadRequestError} = require('../errors/errors');
const {
    findDonations,
    retrieveDonation,
    retrieveDonationByCampaignId,
    retrieveDonationByUserId,
    createDonation,
    updateDonation,
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
        const {donationId} = req.params;
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

    async GetDonationByCampaignId(req, res, next) {
        const {campaignId} = req.params;
        try {
            const isId = mongoose.isValidObjectId(campaignId);
            if (!isId) throw new BadRequestError('id in get donation by campaign id');
            const donations = await retrieveDonationByCampaignId(campaignId);
            if (!donations || donations.length === 0) throw new NotFoundError(`Donations from campaign id <${campaignId}>`);
            res.status(200).json(donations);
        } catch (error) {
            next(error);
        }
    },

    async GetDonationByUserId(req, res, next) {
        const { userId } = req.params;
        console.log(userId);
        try {
            const isId = mongoose.isValidObjectId(userId);
            if (!isId) throw new BadRequestError('id in get donation by user id');
            const donations = await retrieveDonationByUserId(userId);
            if (!donations || donations.length === 0) throw new NotFoundError(`Donations from user id <${userId}>`);
            res.status(200).json(donations);
        } catch (error) {
            next(error);
        }
    },

    async addDonation(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) throw new BadRequestError('create');
            const donationRes= await createDonation(req.body);
            console.log(donationRes);
            res.status(200).json(donationRes);
        } catch (error) {
            next(error);
        }
    },

    async updateDonation(req, res, next) {
        try {
            const {donationId} = req.params;
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
