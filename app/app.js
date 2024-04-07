require('express-async-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const  errorHandler  = require('../middlewares/errorHandler');
const passportSetup = require('../middlewares/passport');
const session = require('express-session');
const passport = require('passport');
const { connect } = require('../database/MongoStorage');

const {STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY} = require('../constants');
connect();

const app = express();

const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
};

app.use(cors(corsOptions));

app.use(session({
    secret: '2Gather',
    maxAge: 24 * 60 * 60 * 1000,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use(passport.initialize());
app.use(passport.session());


const port = process.env.PORT || 3000;
const { usersRouter } = require('../routers/usersRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
// app.use('/campaigns', campaignsRouter);
// app.use('/donations', donationsRouter);
app.use('/users', usersRouter);

app.use(errorHandler);

app.use((req, res) => {
    res.status(400).send("Couldn't connect");
});

app.listen(port, () => console.log(`Express server is running on port ${port}`));

module.exports = app; // for testing
