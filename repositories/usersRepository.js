const {MongoStorage} = require('../database/MongoStorage');

const mongoStorage = new MongoStorage('users');

const findUsers = () => mongoStorage.find({});
const retrieveUser = (id) => mongoStorage.retrieve({ _id: id });
const createUser = (user) => mongoStorage.create(user);
const updateUser = (id, user) => mongoStorage.update({ _id: id }, user);
const deleteUser = (id) => mongoStorage.delete({ _id: id });

module.exports = {
    findUsers, retrieveUser, createUser, updateUser, deleteUser,
}
