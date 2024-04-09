const {stripeController,} = require('../controllers/stripeController');
const {donationsController} = require('../controllers/donationsController');
const {BadRequestError, NotFoundError} = require('../errors/errors');

exports.stripeHandler = {
    async TryDonation(req, res, next) {
        const {userId, campaignId} = req.body;
        try {
            if (!userId || !campaignId) throw new BadRequestError('missing parameters in try donation');
            const paymentSession = await stripeController.createPaymentSession();
            if(!paymentSession) throw new NotFoundError('payment session not created');
            console.log(paymentSession);
            res.status(200).json(paymentSession);
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
