const CRUD = require('../interfaces/crud');
const mongoose = require('mongoose');
const { isConnected } = require('../../helpers/mongo');

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
            const { connection } = mongoose;

            if(isConnected(connection)){
                resolve(connection);

                return;
            }

            mongoose.connect(
                process.env.MONGO_DB_URL,
                { useNewUrlParser: true },
                error => error ? console.error('Connection error', error) : null
            );

            connection.once('open', () => resolve(connection));
        })
    }

    async isConnected() {
        return await new Promise(resolve => resolve(isConnected(this.#connection)));
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
