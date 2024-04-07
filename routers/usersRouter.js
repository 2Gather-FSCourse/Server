const { Router } = require('express');
const { usersController } = require('../controllers/usersController');
const passport = require('passport');
const {  CLIENT_URL } = require('../constants');

const usersRouter = new Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:userId', usersController.getUserByID);
usersRouter.post('/', usersController.addUser);
usersRouter.put('/:userId', usersController.updateUser);
usersRouter.delete('/:userId', usersController.deleteUser);
usersRouter.post('/login', usersController.login);
usersRouter.get('/logout', usersController.logout);

usersRouter.get('login/google', passport.authenticate('google', ['profile', 'email']));
usersRouter.get('/google/callback', passport.authenticate('google',{
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed'
}),
(req, res) => {
    console.log("google callback User:", req.user);
}
);

usersRouter.get('/login/success', usersController.googleLogin);
// usersRouter.get('/login/success', (req, res) => {
//     if(req.user) {
//         res.status(200).json({
//             error: false,
//             message: "Login Successful",
//             user: req.user,
//         });
//     } else {
//         res.status(401).json({
//             error: true,
//             message: "Login Failed",
//         });
//     }
//        console.log("login success User:", req.user);
// });




// usersRouter.get('/logout', (req, res) => {
//    req.logout();
//    res.redirect(CLIENT_URL);
// });



// usersRouter.get('/login/failed', (req, res) => {
//     res.status(401).json({
//         error:true,
//         message: "Login failed"
//     });
// });


module.exports ={ usersRouter } ;
