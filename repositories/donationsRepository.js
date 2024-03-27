const { MongoStorage } = require('../database/mongoStorage');

const mongoStorage = new MongoStorage('donations');

const findDonations = () => mongoStorage.find({});

const retrieveDonation = (id) => mongoStorage.retrieve({ _id: id });

const createDonation = (report) => mongoStorage.create(report);

const updateDonation = (id, report) => mongoStorage.update({ _id: id }, report);

const deleteDonation = (report) => mongoStorage.delete({ _id: report });

module.exports = {
    findDonations, retrieveDonation, createDonation, updateDonation, deleteDonation,
};
