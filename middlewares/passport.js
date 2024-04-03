const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const { CLIENT_ID, CLIENT_SECRET } = require('../constants');
const { Authenticate, retrieveUser } = require('../repositories/usersRepository');

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: '/users/google/callback',
    scope: ['profile', 'email'],
 }, function(accessToken, refreshToken, profile, cb) {
         Authenticate(profile)
            .then(user => cb(null, user))
            .catch(err => cb(err));
    }));

passport.serializeUser((user, callback) => {
    console.log("serialize user:" ,user);
    callback(null, user._id);

});

passport.deserializeUser((id, callback) => {
    retrieveUser(id)
        .then(user => { console.log("deserialize user:" ,user); callback(null, user)})
        .catch(err => callback(err));
});
