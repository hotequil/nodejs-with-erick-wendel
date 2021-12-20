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

    async read(search = {}, page = 0, limit = 10){
        return await this.#database.read(search, page, limit);
    }

    async update(id, item){
        return await this.#database.update(id, item);
    }

    async delete(id){
        return await this.#database.delete(id);
    }

    async isConnected() {
        return await this.#database.isConnected();
    }

    async connect() {
        await this.#database.connect();
    }
}

module.exports = Context;
