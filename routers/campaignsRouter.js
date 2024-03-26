const { Router } = require('express');
const { campaginsController } = require('../controllers/campaignsController');

const campaignsRouter = new Router();

campaignsRouter.get('/', campaginsController.getCampagins);
campaignsRouter.get('/:campaginId', campaginsController.getCampaginByID);
campaignsRouter.post('/', campaginsController.addCampagin);
campaignsRouter.put('/:campaginId', campaginsController.updateCampagin);
campaignsRouter.delete('/:campaginId', campaginsController.deleteCampagin);

module.exports = { campaginsRouter: campaignsRouter };
