const {STRIPE_SECRET_KEY} = require('../constants');
const Stripe = require('stripe');
const stripe = Stripe(STRIPE_SECRET_KEY);

const stripeHandler = async (req, res, next) => {
    const {amount, currency, source, description} = req.body;
    try {
        const payment = await stripe.transfer.create({
            amount,
            currency,
            source,
            description,
        });
        res.status(200).json(payment);
    } catch (error) {
        next(error);
    }
};
