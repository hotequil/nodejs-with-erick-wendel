const CRUD = require('./interfaces/crud');
const Sequelize = require('sequelize');

class Postgres extends CRUD{
    #driver = null;
    #model = null;
    #tableName = 'languages';

    constructor(){
        super();
    }

    async create(language){
        const { dataValues } = await this.#model.create(language);

        return dataValues;
    }

    async read(search = {}){
        return await this.#model.findAll({ where: search, raw: true });
    }

    async update(id, language){
        return await this.#model.update(language, { where: { id } });
    }

    async isConnected() {
        try{
            await this.#driver.authenticate();

            return true;
        } catch(error){
            console.error(error);

            return false;
        }
    }

    async connect(){
        this.#driver = new Sequelize(
            this.#tableName,
            'hotequil',
            '12345678',
            { host: 'localhost', dialect: 'postgres', quoteIdentifiers: false, operatorsAliases: false }
        );

        await this.#defineModel();
    }

    async #defineModel(){
        this.#model = this.#driver.define(
            this.#tableName,
            {
                id: {
                    type: Sequelize.INTEGER,
                    required: true,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: Sequelize.STRING,
                    required: true
                },
                extension: {
                    type: Sequelize.STRING,
                    required: true
                }
            },
            {
                tableName: this.#tableName,
                freezeTableName: false,
                timestamps: false
            }
        );

        await this.#model.sync();
    }
}

module.exports = Postgres;
