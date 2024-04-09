require('express-async-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const  errorHandler  = require('../middlewares/errorHandler');
// const passportSetup = require('../middlewares/passport');
// const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { connect } = require('../database/MongoStorage');

connect();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(session({
    secret: 'together',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60000 },
}));
app.use(cookieParser());



// app.use(passport.initialize());
// app.use(passport.session());


const port = process.env.PORT || 3000;
const {usersRouter} = require('../routers/usersRouter');
const {campaignsRouter} = require('../routers/campaignsRouter');
const {donationsRouter} = require('../routers/donationsRouter');
const {stripeRouter} = require('../routers/stripeRouter');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));
app.use('/campaigns', campaignsRouter);
app.use('/donations', donationsRouter);
app.use('/users', usersRouter);
app.use('/stripe', stripeRouter);
// app.use(cookieJwtAuth);

app.use(errorHandler);

app.use((req, res) => {
    res.status(400).send("Couldn't connect");
});

app.listen(port, () => console.log(`Express server is running on port ${port}`));

module.exports = app; // for testing
