const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const { CLIENT_ID, CLIENT_SECRET } = require('../constants');
const { Authenticate } = require('../repositories/usersRepository');

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
    callback(null, user);
});

passport.deserializeUser((user, callback) => {
    callback(null, user);
});
