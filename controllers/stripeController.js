const {STRIPE_SECRET_KEY} = require('../constants');
const Stripe = require('stripe');
const stripe = Stripe(STRIPE_SECRET_KEY);
const { NotFoundError, BadRequestError } = require('../errors/errors');

exports.stripeController = {
    async
};
