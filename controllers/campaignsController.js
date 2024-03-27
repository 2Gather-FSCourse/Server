const {
  fetchCampaigns,
  newCampaign,
  retrieveCampaignByTitle,
  retrieveCampaignById,
  deleteCampaign,
} = require("../repositories/campaignsRepository");
const {
  AlreadyExistsError,
  BadRequestError,
  NotFoundError,
  ServerError,
} = require("../errors/errors");
const mongoose = require("mongoose");
const keys = [
  "founderId",
  "title",
  "orgId",
  "startDate",
  "endDate",
  "goal",
  "campaignType",
  "campaignCategory",
];

const getCampaigns = async (req, res) => {
  const campaigns = await fetchCampaigns();
  res.status(200).json(campaigns);
};
const getCampaignByID = async (req, res) => {
  const { campaignId } = req.params;
  console.log(campaignId);
  if (!campaignId) throw new NotFoundError("Campaign ID");
  if (!mongoose.isValidObjectId(campaignId))
    throw new BadRequestError("Campaign ID");
  const campaign = await retrieveCampaignById(campaignId);
  res.status(200).json(campaign);
};
const addCampaign = async (req, res) => {
  keys.forEach((key) => {
    if (!req.body[key]) throw new NotFoundError(`The key ${key} is required`);
  });
  const { title, orgId } = req.body;
  const titleExists = await retrieveCampaignByTitle(orgId, title);
  if (titleExists) throw new AlreadyExistsError(`The campaign '${title}'`);
  const campaign = await newCampaign(req.body);
  res.status(200).json(campaign);
};
const updateCampaign = async (req, res) => {
  const { campaignId } = req.params;
  if (!campaignId) throw new NotFoundError("Campaign ID");
  if (!mongoose.isValidObjectId(campaignId))
    throw new BadRequestError("Campaign ID");
  if (!(await retrieveCampaignById(campaignId)))
    throw new NotFoundError(`The campaign with ID ${campaignId}`);
  const updated = await updateCampaign(campaignId, req.body);
  if (!updated || !updated.length) throw new ServerError("Update campaign");
  res.status(201).json({ success: 1 });
};
const removeCampaign = async (req, res) => {
  const { campaignId } = req.params;
  if (!campaignId) throw new NotFoundError("Campaign ID");
  if (!mongoose.isValidObjectId(campaignId))
    throw new BadRequestError("Campaign ID");
  if (!(await retrieveCampaignById(campaignId)))
    throw new NotFoundError(`The campaign with ID ${campaignId}`);
  if (!(await deleteCampaign(campaignId)))
    throw new ServerError("Delete campaign");
  res.status(201).json({ success: 1 });
};
exports.campaignsController = {
  getCampaigns,
  getCampaignByID,
  addCampaign,
  updateCampaign,
  removeCampaign,
};
