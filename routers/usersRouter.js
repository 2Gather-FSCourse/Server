const { Router } = require('express');
const { usersController } = require('../controllers/usersController');

const usersRouter = new Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:userId', usersController.getUserByID);
usersRouter.post('/', usersController.addUser);
usersRouter.put('/:userId', usersController.updateUser);
usersRouter.delete('/:userId', usersController.deleteUser);

module.exports =  { usersRouter };
