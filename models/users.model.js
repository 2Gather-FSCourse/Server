const { Schema, model } = require('mongoose');
// const { donationsSchema } = require('./donations.model');

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
        invoice: {type: String},
        amount: {type: Number},
        itemList: {type: [itemSchema]},
    }
);

const usersSchema = new Schema({
    userType: { type: String , enum: ["Donor","Organization"], required: true },
    name: { type: String },
    age: { type: Number, required: true },
    img: { type: String },
    phone: { type: String, required: true },
    contribution: {type: [donationsSchema]},
}, { collection: 'users' });

module.exports = model('user', usersSchema);


