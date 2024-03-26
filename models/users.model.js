const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
    userType: { type: String, required: true },
    name: { type: String },
    age: { type: Number },
    img: { type: String },
    contribution: { type: Number, required: true },
    savedCards: { type: Array, required: true },
}, { collection: 'users' });

module.exports = model('user', usersSchema);


