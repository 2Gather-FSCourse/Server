const { Router } = require('express');
const { usersController } = require('../controllers/usersController');
const passport = require('passport');
const { CLIENT_ID, CLIENT_SECRET, CLIENT_URL } = require('../constants');


const usersRouter = new Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:userId', usersController.getUserByID);
usersRouter.post('/', usersController.addUser);
usersRouter.put('/:userId', usersController.updateUser);
usersRouter.delete('/:userId', usersController.deleteUser);


usersRouter.get('/login/failed', (req, res) => {
    res.status(401).json({
        error:true,
        message: "Login failed"
    });
});

usersRouter.get('/login/success', (req, res) => {
   if(req.user){
       res.status(200).json({
          error:false,
            message: "Login Successful",
            user: req.user,
       });
   } else{
       res.status(403).json({
              error:true,
              message: "Not Authorized"
       });
   }
});


usersRouter.get('/google', passport.authenticate('google', ['profile', 'email']));

usersRouter.get('/google/callback', passport.authenticate('google',{
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed'
}));

usersRouter.get('/logout', (req, res) => {
   req.logout();
    res.redirect(CLIENT_URL);
});


module.exports ={ usersRouter } ;
