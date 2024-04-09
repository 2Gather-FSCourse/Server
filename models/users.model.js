const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
    googleId: { type: String },
    userType: { type: String , enum: ["Donor","Organization"], required: true },
    orgId: {
        type: String,
        required: function() {
            return this.userType === 'Organization';
        }
    },
    name: { type: String },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    img: { type: String },
    customerId: { type: String },
    phone: { type: String, required: true },
    password: { type: String },
}, { collection: 'users' });

module.exports = model('user', usersSchema);


