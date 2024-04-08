require('express-async-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const  errorHandler  = require('../middlewares/errorHandler');
const passportSetup = require('../middlewares/passport');
const session = require('express-session');
const passport = require('passport');
const { connect } = require('../database/MongoStorage');
const store = new session.MemoryStore();

connect();

const app = express();

const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
};

app.use(session({
    secret: 'some secret',
    resave: false,
    cookie: { maxAge: 60000 },
    saveUninitialized: false,
    store,
}));



app.use(passport.initialize());
app.use(passport.session());


const port = process.env.PORT || 3000;
const {usersRouter} = require('../routers/usersRouter');
const {campaignsRouter} = require('../routers/campaignsRouter');
const {donationsRouter} = require('../routers/donationsRouter');

app.use(cors(
    methods = "GET,POST,PUT,DELETE",
    origin = "*",
));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));
app.use('/campaigns', campaignsRouter);
app.use('/donations', donationsRouter);
app.use('/users', usersRouter);

app.use(errorHandler);

app.use((req, res) => {
    res.status(400).send("Couldn't connect");
});

app.listen(port, () => console.log(`Express server is running on port ${port}`));

module.exports = app; // for testing
