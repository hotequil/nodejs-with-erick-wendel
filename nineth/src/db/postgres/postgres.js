const CRUD = require('../interfaces/crud');
const Sequelize = require('sequelize');

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

    async update(id, language){
        return await this.#model.update(language, { where: { id } });
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
        const connection = new Sequelize(
            schema.name,
            'hotequil',
            '12345678',
            { host: 'localhost', dialect: 'postgres', quoteIdentifiers: false, logging: false }
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
