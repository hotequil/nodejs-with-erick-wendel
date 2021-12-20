const CRUD = require('../interfaces/crud');
const mongoose = require('mongoose');
const { readyState } = require('../enums/mongo');

class Mongo extends CRUD{
    #model = null;
    #connection = null;

    constructor(connection, model){
        super();

        this.#connection = connection;
        this.#model = model;
    }

    static async connect(){
        return await new Promise(resolve => {
            mongoose.connect(
                'mongodb://hotequil:123456789@localhost:27017/languages',
                { useNewUrlParser: true },
                error => error ? console.error('Connection error', error) : null
            );

            mongoose.connection.once('open', () => {
                console.log('Database running');

                resolve(mongoose.connection);
            });
        })
    }

    async isConnected() {
        return await new Promise(resolve => resolve(this.#connection.readyState === readyState.CONNECTED));
    }

    async create(language){
        return await this.#model.create(language);
    }

    async read(search, skip, limit){
        return await this.#model.find(search).skip(skip).limit(limit);
    }

    async update(id, data){
        return await this.#model.updateOne({ _id: id }, { $set: data });
    }

    async delete(id){
        return await this.#model.deleteOne({ _id: id });
    }
}

module.exports = Mongo;
