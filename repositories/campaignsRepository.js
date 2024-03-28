const { MongoStorage } = require("../database/MongoStorage");
const storage = new MongoStorage("campaigns");
const retrieveCampaigns = async () => {
  return storage.find();
};
const retrieveCampaignById = async (id) => storage.retrieve({ _id: id });
const retrieveCampaignByTitle = async (org, title) =>
  storage.retrieve({ orgId: org, title: title });

const newCampaign = async (campaign) => {
  return storage.create(campaign);
};
const putCampaign = async (id, data) => storage.update({ _id: id }, data);

module.exports = {
  fetchCampaigns: retrieveCampaigns,
  retrieveCampaignByTitle,
  retrieveCampaignById,
  newCampaign,
  putCampaign,
};
