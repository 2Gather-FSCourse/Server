const {Schema, model} = require('mongoose');

const donationsSchema = new Schema(
    {
        campaignId: {type: String, required: true},
        donorId: {type: String, required: true},
    }, {collection: 'donations'}
);

module.exports = model('donation', donationsSchema);
