const { MongoStorage } = require('../database/MongoStorage');

const mongoStorage = new MongoStorage('donations');

const findDonations = () => mongoStorage.find({});

const retrieveDonation = (id) => mongoStorage.retrieve({ _id: id });

const createDonation = (donation) => mongoStorage.create(donation);

const updateDonation = (id, donation) => mongoStorage.update({ _id: id }, donation);

const deleteDonation = (donation) => mongoStorage.delete({ _id: donation });

module.exports = {
    findDonations, retrieveDonation, createDonation, updateDonation, deleteDonation,
};
