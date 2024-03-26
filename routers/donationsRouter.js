const { Router } = require('express');
const { donationsController } = require('../controllers/donationsController');

const donationsRouter = new Router();

donationsRouter.get('/', donationsController.getDonations);
donationsRouter.get('/:donationId', donationsController.getDonationByID);
donationsRouter.post('/', donationsController.addDonation);
donationsRouter.put('/:donationId', donationsController.updateDonation);
donationsRouter.delete('/:donationId', donationsController.deleteDonation);

module.exports = { donationsRouter };
