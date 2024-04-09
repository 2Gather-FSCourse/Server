const {stripeController,} = require('../controllers/stripeController');
const {donationsController} = require('../controllers/donationsController');
const {BadRequestError, NotFoundError} = require('../errors/errors');

exports.stripeHandler = {
    async TryDonation(req, res, next) {
        //       const {userId, campaignId} = req.body;
        try {
            console.log(req.body);
            const paymentSession = await stripeController.createPaymentSession();
            console.log(paymentSession);
            if (!paymentSession) throw new NotFoundError('payment session not created');
            res.status(200).json(paymentSession);
        } catch (error) {
            next(error);
        }
    },

    async donationPayment(req, res, next) {
        try {
            const {userId, campaignId} = req.body;
            const paymentIntent = await stripeController.donationPaymentIntent();
            const amount = 19.99;
            const donation = {
                userId,
                campaignId,
                amount,
                transactionId: paymentIntent.id
            };
            const donationRes = await donationsController.addDonation(donation);
            if(!donationRes) throw new BadRequestError('donation not created');
            res.status(200).json(paymentIntent.client_secret);
        } catch (error) {
            next(error);
        }
    },

    async makeNewDonation(req, res, next) {
        try {
            const {userId, customerId, amount, campaignId, description, paymentMethodId} = req.body;
            console.log(req.body);
            if (!userId || !customerId || !amount || !campaignId || !paymentMethodId) throw new BadRequestError('missing parameters in make new donation');

            const centAmount = amount * 100;
            const payment = await stripeController.chargeCustomer(customerId, centAmount, 'ils', description, paymentMethodId);

            let confirmedPayment = false;
            if (payment[1].status === 'succeeded') confirmedPayment = true;

            const donation = {
                userId,
                campaignId,
                amount,
                transactionId: payment[0].id,
                confirmation: confirmedPayment,
            };

            const donationRes = await donationsController.addDonation(donation);
            if (!donationRes) throw new NotFoundError('donation not created');

            res.status(200).json(donationRes);
        } catch (error) {
            next(error);
        }
    },
};
