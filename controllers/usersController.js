const mongoose = require('mongoose');
const { NotFoundError, BadRequestError  } = require('../errors/errors');
const bcrypt = require('bcrypt');

const {
    findUsers,
    retrieveUser,
    createUser,
    updateUser,
    deleteUser,
    retrieveUserByEmail,
} = require('../repositories/usersRepository');

exports.usersController = {
    async getUsers(req, res, next) {
        try {
            const users = await findUsers();
            if (!users || users.length === 0) throw new NotFoundError('users');
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },
    async getUserByID(req, res, next) {
        const {userId} = req.params;
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
            const {userType, age, phone, password} = req.body;
            if (
                !userType
                || !age
                || !phone
                || !password
            ) throw new BadRequestError('create');
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;
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
        const {userId} = req.params;
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
        const {userId} = req.params;
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
    },
    async login(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) throw new BadRequestError('login');
            const {
                email,
                password
            } = req.body;
            if (!email || !password) throw new NotFoundError('Login - missing arguments');
            const user = await retrieveUserByEmail(email);
            if (!user || user.length === 0) throw new NotFoundError(`user with email address <${email}>`);
            const {
                userType,
                name,
                age,
                img,
                phone,
            } = user;
            if (req.session.authenticated) {
                res.json(req.session);
            } else if (await bcrypt.compare(password, user.password)) {
                req.session.authenticated = true;
                req.session.user = {
                    userType,
                    name,
                    age,
                    img,
                    phone,
                };
                res.status(200).json(req.session.user);
            } else {
                throw new BadRequestError('password');
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                error.status = 400;
            }
            next(error);
        }
    },
    async logout(req, res, next) {
        try {
            req.session.destroy(req.session.sessionID);
            res.status(200)
                .json('logged out');
        } catch (error) {
            next(error);
        }
    },
    async googleLogin(req, res, next) {
        try {
            if (req.user) {
                req.session.authenticated = true;
                req.session.user = {
                    userType: req.user.userType,
                    name: req.user.name,
                    age: req.user.age,
                    img: req.user.img,
                    phone: req.user.phone,
                };
                res.status(200).json({
                    error: false,
                    message: 'Login Successful',
                    user: req.session.user,
                });
            } else {
                res.status(401).json({
                    error: true,
                    message: 'Login Failed',
                });
            }
        } catch (error) {
            next(error);
        }
    },
};
