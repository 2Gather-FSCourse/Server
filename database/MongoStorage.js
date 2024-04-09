const { EventEmitter } = require("events");
const mongoose = require("mongoose");
const Path = require("path");
const constants = require("constants");
require('dotenv').config();

const connect = () => {
  const url = `mongodb+srv://${process.env.DB_HOST}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
  mongoose
    .connect(url)
    .then(() => console.log(`connected to DB`))
    .catch((err) => console.log(`connection error: ${err}`));
};

class MongoStorage extends EventEmitter {
  constructor(entity) {
    super();

    this.entityName = entity.charAt(0).toLowerCase() + entity.slice(1);
    this.Model = require(
      Path.join(__dirname, `../models/${this.entityName}.model.js`),
    );
  }

  find() {
    return this.Model.find();
  }

  retrieve(id) {
    return this.Model.findOne(id);
  }

  create(data) {
    return this.Model.create(data);
  }

  createMany(data) {
    return this.Model.insertMany(data);
  }

  async findOrCreate(profile) {
    let user = await this.Model.findOne({ googleId: profile.id });

    if (!user) {
      user = await this.Model.create({
        googleId: profile.id,
        name: profile.displayName.givenName,
        age: 18,
        userType: "Donor",
        phone: "0000000000",
        email: profile.emails[0].value,
        img: profile.photos[0].value,
      });
    }
    return user;
  }

  delete(id) {
    return this.Model.findByIdAndDelete(id);
  }

  update(id, data) {
    return this.Model.findOneAndUpdate(id, data, { new: true });
  }
}

module.exports = { MongoStorage, connect };
