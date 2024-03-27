const mongoose = require('mongoose');
const { NotFoundError, BadRequestError  } = require('../errors/errors');

const {
    findUsers,
    retrieveUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../repositories/usersRepository');

exports.usersController = {
    async getUsers(req, res ,next) {
        try {
            const users = await findUsers();
            if (!users || users.length === 0) throw new NotFoundError('users');
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },
    async getUserByID(req, res, next) {
        const { userId } = req.params;
        try {
            const isId = mongoose.isValidObjectId(userId);
            if (!isId) throw new BadRequestError('id');
            const user = await retrieveUser(userId);
            if (!user || user.length === 0) throw new NotFoundError(`user with id <${userId}>`);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },
    async addUser(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) throw new BadRequestError('create');
            const { userType, name, phone } = req.body;
            if (
                !userType
                || !name
                || !phone
            ) throw new BadRequestError('create');
            const user = await createUser(req.body);
            res.status(200).json(user);
        } catch (error) {
            if (error.name === 'ValidationError') {
                error.status = 400;
            }
            next(error);
        }
    },
    async updateUser(req, res, next) {
        const { userId } = req.params;
        try {
            const isId = mongoose.isValidObjectId(userId);
            if (!isId) throw new BadRequestError('id');
            if (Object.keys(req.body).length === 0) throw new BadRequestError('update');
            const user = await updateUser(userId, req.body);
            if (!user || user.length === 0) throw new NotFoundError(`user with id <${userId}>`);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },
    async deleteUser(req, res, next) {
        const { userId } = req.params;
        try {
            const isId = mongoose.isValidObjectId(userId);
            if (!isId) throw new BadRequestError('id');
            const user = await deleteUser(userId);
            if (!user || user.length === 0) throw new NotFoundError(`user with id <${userId}>`);
            res.status(200).json(user);
        } catch (error) {
            if (error.name === 'ValidationError') {
                error.status = 400;
            }
            next(error);
        }
    }
}
