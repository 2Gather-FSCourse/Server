const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const { CLIENT_ID, CLIENT_SECRET, CLIENT_URL } = require('../constants');

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email'],
}, (accessToken, refreshToken, profile, callback) => {
     callback(null, profile);
}));

passport.serializeUser((user, callback) => {
    callback(null, user);
});

passport.deserializeUser((user, callback) => {
    callback(null, user);
});
