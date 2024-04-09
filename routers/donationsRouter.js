const { Router } = require('express');
const { donationsController } = require('../controllers/donationsController');
const { stripeHandler } = require('../middlewares/stripeHandler');

const donationsRouter = new Router();

donationsRouter.get('/list/:userId', donationsController.GetDonationByUserId);
donationsRouter.get('/', donationsController.getAllDonations);
donationsRouter.get('/:donationId', donationsController.getDonationById);
donationsRouter.post('/', stripeHandler.donationPayment);
donationsRouter.put('/:donationId', donationsController.updateDonation);

// donationsRouter.get('/list?campaign_id=campaignId&filterBy=value', donationsController.GetDonationByCampaignId);
// donationsRouter.get('/list?userId=userId', donationsController.GetDonationByUserId);


module.exports = { donationsRouter };
