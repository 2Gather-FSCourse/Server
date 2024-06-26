const {MongoStorage} = require('../database/MongoStorage');

const mongoStorage = new MongoStorage('donations');

const findDonations = () => mongoStorage.find({});

const retrieveDonation = (id) => mongoStorage.retrieve({_id: id});

const retrieveDonationByCampaignId = (campaignId) => mongoStorage.find({campaignId: campaignId});

const retrieveDonationByUserId = (userId) => mongoStorage.find({userId: userId});

const createDonation = (donation) => mongoStorage.create(donation);

const updateDonation = (id, donation) => mongoStorage.update({_id: id}, donation);

module.exports = {
    findDonations,
    retrieveDonation,
    retrieveDonationByCampaignId,
    retrieveDonationByUserId,
    createDonation,
    updateDonation,
};
