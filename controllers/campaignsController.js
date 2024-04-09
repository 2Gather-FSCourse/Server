const {
  fetchCampaigns,
  newCampaign,
  putCampaign,
  retrieveCampaignByTitle,
  retrieveCampaignById,
  searchTitle,
} = require("../repositories/campaignsRepository");
const {
  AlreadyExistsError,
  BadRequestError,
  NotFoundError,
  ServerError,
} = require("../errors/errors");
const mongoose = require("mongoose");
const { DEFAULT_CAMPAIGN_IMAGE } = require("../utils/constants");
const keys = [
  // "founderId",
  "title",
  "orgId",
  "startDate",
  "endDate",
  "goal",
  "campaignType",
  "campaignCategory",
];

checkBody = (req) => {
  keys.forEach((key) => {
    if (!req.body[key]) throw new NotFoundError(`The key ${key} is required`);
  });
  if (req.body.startDate > req.body.endDate)
    throw new BadRequestError("Start date must be before end date");
  if (req.body.goal < 0)
    throw new BadRequestError("Goal must be greater than 0");
};
const getCampaigns = async (req, res) => {
  const campaigns = await fetchCampaigns();
  res.status(200).json(campaigns);
};

const searchCampaigns = async (req, res) => {
  const { searchTerm } = req.params;
  const campaigns = await searchTitle(searchTerm);
  res.status(200).json(campaigns);
};
const getCampaignByID = async (req, res) => {
  const { campaignId } = req.params;
  if (!campaignId) throw new NotFoundError("Campaign ID");
  if (!mongoose.isValidObjectId(campaignId))
    throw new BadRequestError("Campaign ID");
  const campaign = await retrieveCampaignById(campaignId);
  res.status(200).json(campaign);
};
const addCampaign = async (req, res) => {
  checkBody(req);
  const { title, orgId } = req.body;
  const titleExists = await retrieveCampaignByTitle(orgId, title);
  if (titleExists) throw new AlreadyExistsError(`The campaign '${title}'`);
  const campaign = await newCampaign(req.body);
  res.status(201).json(campaign);
};
const updateCampaign = async (req, res) => {
  checkBody(req);
  const { campaignId } = req.params;
  if (!campaignId) throw new NotFoundError("Campaign ID");
  if (!mongoose.isValidObjectId(campaignId))
    throw new BadRequestError("Campaign ID");
  if (!(await retrieveCampaignById(campaignId)))
    throw new NotFoundError(`The campaign with ID ${campaignId}`);
  const updated = await putCampaign(campaignId, req.body);
  if (!updated) throw new ServerError("Update campaign");
  res.status(201).json({ success: 1 });
};

const uploadCampaignImage = async (req, res) => {};
exports.campaignsController = {
  getCampaigns,
  getCampaignByID,
  addCampaign,
  updateCampaign,
  searchCampaigns,
};
