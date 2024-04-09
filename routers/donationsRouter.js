const { Router } = require('express');
const { donationsController } = require('../controllers/donationsController');

const donationsRouter = new Router();

donationsRouter.get('/', donationsController.getAllDonations);
donationsRouter.get('/:donationId', donationsController.getDonationById);
donationsRouter.post('/', donationsController.addDonation);
donationsRouter.put('/:donationId', donationsController.updateDonation);

donationsRouter.get('/list?campaign_id=campaignId&filterBy=value', donationsController.GetDonationByCampaignId);
donationsRouter.get('/list?user_id=userId&filterBy=value', donationsController.GetDonationByUserId);

module.exports = { donationsRouter };
