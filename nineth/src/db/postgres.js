const CRUD = require('./interfaces/crud');
const Sequelize = require('sequelize');

class Postgres extends CRUD{
    #driver = null;
    #model = null;
    #tableName = 'languages';

    constructor(){
        super();

        this.#connect();
        this.#defineModel();
    }

    create(item){
        console.log(`Created item in Postgres: ${JSON.stringify(item)}`);
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

    #connect(){
        this.#driver = new Sequelize(
            this.#tableName,
            'hotequil',
            '12345678',
            { host: 'localhost', dialect: 'postgres', quoteIdentifiers: false, operatorsAliases: false }
        );
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
