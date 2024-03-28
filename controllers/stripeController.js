const {STRIPE_SECRET_KEY} = require('../constants');
const Stripe = require('stripe');
const stripe = Stripe(STRIPE_SECRET_KEY);

exports.stripeController = {
    async chargeCustomer(customerId, amount, currency, description, paymentMethodId) {
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            customer: customerId,
            description: description,
            payment_method_types: ['card'],
        });

        const confirmation = await stripe.paymentIntents.confirm(payment.id, {payment_method: paymentMethodId});
        return [payment, confirmation]
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
