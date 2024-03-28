const { Router } = require("express");
const { campaignsController } = require("../controllers/campaignsController");

const campaignsRouter = new Router();

campaignsRouter.get("/", campaignsController.getCampaigns);
campaignsRouter.get("/:campaignId", campaignsController.getCampaignByID);
campaignsRouter.post("/", campaignsController.addCampaign);
campaignsRouter.put("/:campaignId", campaignsController.updateCampaign);
module.exports = { campaignsRouter: campaignsRouter };
