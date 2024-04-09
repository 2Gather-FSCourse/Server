const {STRIPE_SECRET_KEY} = require('../constants');
const Stripe = require('stripe');
const stripe = Stripe(STRIPE_SECRET_KEY);

exports.stripeController = {
    async getPublicKey(req, res, next) {
        try{
            res.status(200).json(process.env.STRIPE_PUBLISHABLE_KEY);
        }catch (error) {
            next(error);
        }
    },

    async donationPaymentIntent() {
        return await stripe.paymentIntents.create({
            currency: "ils",
            amount: 1999,
            automatic_payment_methods: { enabled: true },
        });
    },

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

    async paymentLinkFunction() {
        const paymentLink = await stripe.paymentLinks.create({
            line_items: [
                {
                    price: 20,
                    quantity: 1,
                },
            ],
            inactive_message: 'Sorry, we are out of stock for now!',
        });
        return paymentLink.url;
    },

    async createPaymentSession() {
        // try {
            console.log('33');
            const session = await stripe.checkout.sessions.create({
                submit_type: 'donate',
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'ILS',
                            unit_amount: 2000, // Representing 20.00 USD
                            product_data: {
                                name: 'Donation',
                            },
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: 'http://localhost:5173/success',
                cancel_url: 'http://localhost:5173/cancel',
            });
            console.log('47');
            return session;
            // res.statusCode(200).data(session.id);
        // } catch (error) {
        //     next(error);
        // }
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
