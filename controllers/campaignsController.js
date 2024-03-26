const {fetchCampaigns,} = require('../repositories/campaignsRepository');


    const getCampaigns = async (req, res) => {
    const campaigns = await fetchCampaigns();
        res.status(200).json(campaigns);
    }
    const getCampaignByID =(req, res) => {
        res.send('GET /campaigns/:CampaignId');
    }
    const  addCampaign= (req, res) => {
        res.send('POST /campaigns');
    }
    const updateCampaign= (req, res) => {
        res.send('PUT /campaigns/:CampaignId');
    }
    const deleteCampaign = (req, res) => {
        res.send('DELETE /campaigns/:CampaignId');
    }
 exports.campaignsController = {}