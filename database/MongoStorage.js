const {EventEmitter} = require('events');
const mongoose = require('mongoose');
const Path = require("path");
const consts = require('../constants');

const {DB_HOST, DB_USER, DB_PASS} = consts;
const connect = () => {
    const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;
    mongoose
        .connect(url)
        .then(() => console.log(`connected to DB`))
        .catch((err) => console.log(`connection error: ${err}`));
}

class MongoStorage extends EventEmitter {
    constructor(entity) {
        super();

        this.entityName = entity.charAt(0).toLowerCase() + entity.slice(1);
        this.Model = require(Path.join(__dirname, `../models/${this.entityName}.model.js`));
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
        return this.Model.findOneAndUpdate(id, data, {new: true})
    }
}

module.exports = {MongoStorage, connect};