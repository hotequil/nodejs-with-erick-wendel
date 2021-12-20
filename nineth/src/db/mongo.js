const CRUD = require('./interfaces/crud');
const mongoose = require('mongoose');
const { readyState } = require('./enums/mongo');

class Mongo extends CRUD{
    #model = null;

    constructor(){
        super();
    }

    async connect(){
        return await new Promise(resolve => {
            mongoose.connect(
                'mongodb://hotequil:123456789@localhost:27017/languages',
                { useNewUrlParser: true },
                error => error ? console.error('Connection error', error) : null
            );

            mongoose.connection.once('open', () => {
                console.log('Database running');

                resolve();
            });

            this.#createModel();
        })
    }

    async isConnected() {
        return await new Promise(resolve => resolve(mongoose.connection.readyState === readyState.CONNECTED));
    }

    async create(language){
        return await this.#model.create(language);
    }

    async read(search, skip, limit){
        return await this.#model.find(search).skip(skip).limit(limit);
    }

    #createModel(){
        this.#model = mongoose.model(
            'languages',
            new mongoose.Schema({
                name: {
                    type: String,
                    required: true
                },
                extension: {
                    type: String,
                    required: true
                },
                insertedAt: {
                    type: Date,
                    default: new Date()
                }
            })
        );
    }
}

module.exports = Mongo;
