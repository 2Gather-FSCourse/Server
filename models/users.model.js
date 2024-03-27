const { Schema, model } = require('mongoose');
const { donationsSchema } = require('./donations.model');

const usersSchema = new Schema({
    userType: { type: String , enum: ["Donor","Organization"], required: true },
    name: { type: String },
    age: { type: Number, required: true },
    img: { type: String },
    phone: { type: String, required: true },
    contribution: [donationsSchema],
}, { collection: 'users' });

module.exports = model('user', usersSchema);


