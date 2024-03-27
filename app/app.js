require('express-async-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const  errorHandler  = require('../middlewares/errorHandler');

const app = express();

const port = process.env.PORT || 3000;
const { usersRouter } = require('../routers/usersRouter');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/users', usersRouter);

app.use(errorHandler);

app.use((req, res) => {
    res.status(400).send("Couldn't connect");
});

app.listen(port, () => console.log(`Express server is running on port ${port}`));

module.exports = app; // for testing
