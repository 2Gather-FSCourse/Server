const { EventEmitter } = require('events');
const mongoose = require('mongoose');
const Path = require("path");
const consts = require('../constants');

const { DB_HOST, DB_USER, DB_PASS } = consts;

module.exports = class mongoStorage extends EventEmitter {
    constructor(entity) {
        super();

        this.entityName = entity.charAt(0).toLowerCase() + entity.slice(1);
        this.Model = require(Path.join(__dirname, `../models/${this.entityName}.model.js`));
        this.connect();
    }

    // eslint-disable-next-line class-methods-use-this
    connect() {
        const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;
        mongoose
            .connect(url)
            .then(() => console.log('connected to MongoDB'))
            .catch((err) => console.log(`connection error: ${err}`));
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

    delete(id) {
        return this.Model.findByIdAndDelete(id);
    }

    update(id, data) {
        return this.Model.findOneAndUpdate(id, data, { new: true })
    }

}
