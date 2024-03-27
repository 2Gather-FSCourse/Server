const { Router } = require('express');
const { donationsController } = require('../controllers/donationsController');

const donationsRouter = new Router();

donationsRouter.get('/', donationsController.getAllDonations);
donationsRouter.get('/:donationId', donationsController.getDonationById);
donationsRouter.post('/', donationsController.addDonation);
donationsRouter.put('/:donationId', donationsController.updateDonation);
donationsRouter.delete('/:donationId', donationsController.deleteDonation);

module.exports = { donationsRouter };
