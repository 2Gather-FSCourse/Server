const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
    userType: { type: String , enum: ["Donor","Organization"], required: true },
    orgId: {
        type: String,
        required: function() {
            return this.userType === 'Organization';
        }
    },
    name: { type: String },
    age: { type: Number, required: true },
    img: { type: String },
    phone: { type: String, required: true },
}, { collection: 'users' });

module.exports = model('user', usersSchema);


