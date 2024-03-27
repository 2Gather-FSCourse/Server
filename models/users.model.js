const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
    userType: { type: String, required: true },
    name: { type: String },
    age: { type: Number, required: true },
    img: { type: String },
    phone: { type: Number, required: true },
    contribution: { type: Number, required: true },
    savedCards: { type: Array, required: true },
}, { collection: 'users' });

module.exports = model('user', usersSchema);


