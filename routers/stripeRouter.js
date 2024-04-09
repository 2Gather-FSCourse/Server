const { Router } = require('express');
const { stripeController } = require('../controllers/stripeController');
const { stripeHandler } = require('../middlewares/stripeHandler');

const stripeRouter = new Router();

stripeRouter.post('/', stripeController.donationPaymentIntent);

module.exports = { stripeRouter };
