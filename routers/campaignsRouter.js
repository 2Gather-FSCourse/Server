const { Router } = require('express');
const { campaignsController } = require('../controllers/campaignsController');

const campaignsRouter = new Router();

campaignsRouter.get('/', campaignsController.getCampagins);
campaignsRouter.get('/:campaginId', campaignsController.getCampaginByID);
campaignsRouter.post('/', campaignsController.addCampagin);
campaignsRouter.put('/:campaginId', campaignsController.updateCampagin);
campaignsRouter.delete('/:campaginId', campaignsController.deleteCampagin);

module.exports = { campaginsRouter: campaignsRouter };
