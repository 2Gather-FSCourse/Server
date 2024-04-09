const { Router } = require('express');
const { donationsController } = require('../controllers/donationsController');

const donationsRouter = new Router();

donationsRouter.get('/list/:userId', donationsController.GetDonationByUserId);
donationsRouter.get('/', donationsController.getAllDonations);
donationsRouter.get('/:donationId', donationsController.getDonationById);
donationsRouter.post('/', donationsController.addDonation);
donationsRouter.put('/:donationId', donationsController.updateDonation);

// donationsRouter.get('/list?campaign_id=campaignId&filterBy=value', donationsController.GetDonationByCampaignId);
// donationsRouter.get('/list?userId=userId', donationsController.GetDonationByUserId);


module.exports = { donationsRouter };
