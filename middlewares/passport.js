const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { CLIENT_ID, CLIENT_SECRET } = require('../constants');
const { Authenticate, retrieveUser } = require('../repositories/usersRepository');

const CALLBACK_URL = 'http://localhost:3000/users/google/callback';

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    passReqToCallback: true,
    scope: ['profile', 'email'],
 }, async (req, accessToken, refreshToken, profile, cb) => {
         const user = await Authenticate(profile);
            if (!user) {
                return cb(null, false);
            }
            return cb(null, user);
    }));

passport.serializeUser((user, callback) => {
    console.log("serialize user:" ,user);
    callback(null, user._id);

});

passport.deserializeUser(async (id, callback) => {
    const user = await retrieveUser(id);
    console.log("deserialize user:" ,user);
    if (!user) {
        console.log("deserialize user not found");
        return callback(null, false);
    }
    callback(null, user);

});
