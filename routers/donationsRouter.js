const { Router } = require('express');
const { donationsController } = require('../controllers/donationsController');

const donationsRouter = new Router();

donationsRouter.get('/', donationsController.getAllDonations);
donationsRouter.get('/:donationId', donationsController.getDonationById);
donationsRouter.post('/', donationsController.addDonation);
donationsRouter.put('/:donationId', donationsController.updateDonation);
donationsRouter.delete('/:donationId', donationsController.deleteDonation);

donationsRouter.get('/byCampaign/campaignId', donationsController.GetDonationByCampaignId);
donationsRouter.get('/byUser/userId', donationsController.GetDonationByUserId);

module.exports = { donationsRouter };
