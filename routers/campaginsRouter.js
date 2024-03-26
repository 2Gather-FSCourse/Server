const { Router } = require('express');
const { campaginsController } = require('../controllers/campaignsController');

const campaginsRouter = new Router();

campaginsRouter.get('/', campaginsController.getCampagins);
campaginsRouter.get('/:campaginId', campaginsController.getCampaginByID);
campaginsRouter.post('/', campaginsController.addCampagin);
campaginsRouter.put('/:campaginId', campaginsController.updateCampagin);
campaginsRouter.delete('/:campaginId', campaginsController.deleteCampagin);

module.exports = { campaginsRouter };
