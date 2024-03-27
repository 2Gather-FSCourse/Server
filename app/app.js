require('express-async-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const errorHandler  = require('../middlewares/errorHandler');
const {STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY} = require('../constants');

const { connect } = require('../database/MongoStorage');
const app = express();

connect();
const port = process.env.PORT || 3001;
const { campaignsRouter } = require('../routers/campaignsRouter');
const { donationsRouter } = require('../routers/donationsRouter');
const { usersRouter } = require('../routers/usersRouter');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/campaigns', campaignsRouter);
app.use('/donations', donationsRouter);
// app.use('/users', usersRouter);

app.use(errorHandler);

app.use((req, res) => {
    res.status(400).send("Couldn't connect");
});

app.listen(port, () => console.log(`Express server is running on port ${port}`));

module.exports = app; // for testing
