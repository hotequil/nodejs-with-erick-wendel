const CRUD = require("../interfaces/crud");

class Context extends CRUD{
    #database = null;

    constructor(strategy){
        super();

        this.#database = strategy;
    }

    async create(item){
        return await this.#database.create(item);
    }

    async read(search){
        return await this.#database.read(search);
    }

    async update(id, item){
        return await this.#database.update(id, item);
    }

    delete(id){
        this.#database.delete(id);
    }

    async isConnected() {
        return await this.#database.isConnected();
    }

    async connect() {
        await this.#database.connect();
    }
}

module.exports = Context;
