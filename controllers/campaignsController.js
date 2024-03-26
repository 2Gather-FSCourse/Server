exports.campaginsController = {
    getCampagins: (req, res) => {
        res.send('GET /campagins');
    },
    getCampaginByID: (req, res) => {
        res.send('GET /campagins/:campaginId');
    },
    addCampagin: (req, res) => {
        res.send('POST /campagins');
    },
    updateCampagin: (req, res) => {
        res.send('PUT /campagins/:campaginId');
    },
    deleteCampagin: (req, res) => {
        res.send('DELETE /campagins/:campaginId');
    }
}
