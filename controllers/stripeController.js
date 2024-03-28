const {STRIPE_SECRET_KEY} = require('../constants');
const Stripe = require('stripe');
const stripe = Stripe(STRIPE_SECRET_KEY);
const {NotFoundError, BadRequestError} = require('../errors/errors');

exports.stripeController = {
    async donateMoney(req, res, next) {
        const {amount, currency, source, description, destination} = req.body;
        try {
            const payment = await stripe.transfer.create({
                amount,
                currency,
                source,
                description,
            });

            const transfer = await stripe.transfers.create({
                amount,
                currency,
                source_transaction: payment.id,
                destination: destination,
            });
            res.status(200).json(payment, transfer);
        } catch (error) {
            next(error);
        }
    },

    async createCustomer(req, res, next) {
        const {email, name} = req.body;
        try {
            const customer = await stripe.customers.create({
                email,
                name,
            });
            res.status(200).json(customer);
        } catch (error) {
            next(error);
        }
    },

    async CreateToken(req, res, next) {
        const {card} = req.body;
        try {
            const token = await stripe.tokens.create({
                card,
            });
            res.status(200).json(token);
        } catch (error) {
            next(error);
        }
    },

    async addTokenToCustomer(req, res, next) {
        const {customerId, token} = req.body;
        try {
            const customer = await stripe.customers.createSource(customerId, {
                source: token,
            });
            res.status(200).json(customer);
        } catch (error) {
            next(error);
        }
    },

    async retrieveCustomer(req, res, next) {
        const {customerId} = req.params;
        try {
            const customer = await stripe.customers.retrieve(customerId);
            res.status(200).json(customer);
        } catch (error) {
            next(error);
        }
    },

    async retrieveToken(req, res, next) {
        const {tokenId} = req.params;
        try {
            const token = await stripe.tokens.retrieve(tokenId);
            res.status(200).json(token);
        } catch (error) {
            next(error);
        }
    },

    async retrieveCard(req, res, next) {
        const {cardId} = req.params;
        try {
            const card = await stripe.cards.retrieve(cardId);
            res.status(200).json(card);
        } catch (error) {
            next(error);
        }
    },

    async retrieveCharge(req, res, next) {
        const {chargeId} = req.params;
        try {
            const charge = await stripe.charges.retrieve(chargeId);
            res.status(200).json(charge);
        } catch (error) {
            next(error);
        }
    },

    async retrieveTransfer(req, res, next) {
        const {transferId} = req.params;
        try {
            const transfer = await stripe.transfers.retrieve(transferId);
            res.status(200).json(transfer);
        } catch (error) {
            next(error);
        }
    },

    async refundCharge(req, res, next) {
        try {
            const {transferId, chargeId} = req.body;
            const refund = await stripe.refunds.create({
                charge: chargeId,
            });
            const transfer = await stripe.transfers.retrieve(transferId);
            if (transfer) {
                await stripe.transfers.update(transferId, {
                    reversal: {
                        amount: transfer.amount,
                        refund_application_fee: false,
                    },
                });
            }
            res.status(200).json({message: 'Transfer and charge canceled successfully.'});
        } catch (error) {
            next(error);
        }
    }
};
