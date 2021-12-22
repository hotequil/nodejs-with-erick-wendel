const CRUD = require('../interfaces/crud');
const Sequelize = require('sequelize');
const { stringToBoolean } = require('../../helpers/manipulate');

class Postgres extends CRUD{
    #connection = null;
    #model = null;

    constructor(connection, model){
        super();

        this.#connection = connection;
        this.#model = model;
    }

    async create(language){
        const { dataValues } = await this.#model.create(language);

        return dataValues;
    }

    async read(where, offset, limit){
        return await this.#model.findAll({ where, offset, limit, raw: true, order: [['id', 'ASC']] });
    }

    async update(id, language, upsert){
        return await this.#model[upsert ? 'upsert' : 'update'](language, { where: { id } });
    }

    async delete(id){
        return await this.#model.destroy({ where: { id } });
    }

    async isConnected() {
        try{
            await this.#connection.authenticate();

            return true;
        } catch(error){
            console.error(error);

            return false;
        }
    }

    static async connect(schema){
        const ssl = stringToBoolean(process.env.SSL_DB);

        const connection = new Sequelize(
            process.env.POSTGRES_DB_URL,
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                logging: false,
                ssl,
                dialectOptions: { ssl }
            }
        );

        const model = connection.define(
            schema.name,
            schema.structure,
            schema.options
        );

        await model.sync();

        return { connection, model };
    }
}

module.exports = Postgres;
