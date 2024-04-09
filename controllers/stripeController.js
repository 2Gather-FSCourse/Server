const {STRIPE_SECRET_KEY} = require('../constants');
const Stripe = require('stripe');
const stripe = Stripe(STRIPE_SECRET_KEY);

exports.stripeController = {
    async getPublicKey(req, res, next) {
        try {
            res.status(200).json({
                publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
            });
        } catch (error) {
            next(error);
        }
    },

    async donationPaymentIntent(req, res, next) {
        try {
            const payment = await stripe.paymentIntents.create({
                currency: "ils",
                amount: 5000,
                automatic_payment_methods: {enabled: true},
            });
            res.status(200).json({
                clientSecret: payment.client_secret,
            });

        } catch (error) {
            next(error);
        }
    },

    async createCustomer(email, name, payment_method) {
        return await stripe.customers.create({
            email,
            name,
            payment_method: payment_method
        });
    },

    async retrieveCustomer(customerId) {
        return await stripe.customers.retrieve(customerId);
    },

    // retrieveCard, retrieveCharge, refundCharge

};
