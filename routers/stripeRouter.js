const { Router } = require('express');
const { stripeController } = require('../controllers/stripeController');
const { stripeHandler } = require('../middlewares/stripeHandler');

const stripeRouter = new Router();

stripeRouter.get('/', stripeController.getPublicKey);
stripeRouter.post('/', stripeController.createPaymentSession);


module.exports = { stripeRouter };
