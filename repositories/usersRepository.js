const {MongoStorage} = require('../database/MongoStorage');

const mongoStorage = new MongoStorage('users');

const findUsers = () => mongoStorage.find({});
const retrieveUser = (id) => mongoStorage.retrieve({ _id: id });
const retrieveGoogleUser = (id) => mongoStorage.retrieve({ googleId: id });

const createUser = (user) => mongoStorage.create(user);
const updateUser = (id, user) => mongoStorage.update({ _id: id }, user);
const deleteUser = (id) => mongoStorage.delete({ _id: id });
const Authenticate = (user) => mongoStorage.findOrCreate(user);

module.exports = {
    findUsers, retrieveUser, createUser, updateUser, deleteUser, Authenticate, retrieveGoogleUser
}
