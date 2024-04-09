const {Schema, model} = require('mongoose');

const itemSchema = new Schema(
    {
        name: {type: String, required: true},
        quantity: {type: Number, required: true},
    }, {collection: 'items'}
);

const donationsSchema = new Schema(
    {
        campaignId: {type: String, required: true},
        userId: {type: String, required: true},
        transactionId: {type: String},
        amount: {type: Number},
        itemList: {type: [itemSchema]},
        confirmation: {type: Boolean, default: false},
    }, {collection: 'donations'}
);

module.exports = model('donation', donationsSchema);
