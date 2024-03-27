const mongoose = require('mongoose');
const { NotFoundError, BadRequestError } = require('../errors/errors');


exports.donationsController = {
    getDonations: (req, res) => {
        res.send('GET /donations');
    },
    getDonationByID: (req, res) => {
        res.send('GET /donations/:donationId');
    },
    addDonation: (req, res) => {
        res.send('POST /donations');
    },
    updateDonation: (req, res) => {
        res.send('PUT /donations/:donationId');
    },
    deleteDonation: (req, res) => {
        res.send('DELETE /donations/:donationId');
    }
}
