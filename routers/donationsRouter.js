const { Router } = require('express');
const { donationsController } = require('../controllers/donationsController');
const { stripeHandler } = require('../middlewares/stripeHandler');

const donationsRouter = new Router();

donationsRouter.get('/', donationsController.getAllDonations);
donationsRouter.get('/:donationId', donationsController.getDonationById);
donationsRouter.post('/', stripeHandler.makeNewDonation);
donationsRouter.put('/:donationId', donationsController.updateDonation);

donationsRouter.get('/byCampaign/campaignId', donationsController.GetDonationByCampaignId);
donationsRouter.get('/byUser/userId', donationsController.GetDonationByUserId);

module.exports = { donationsRouter };
