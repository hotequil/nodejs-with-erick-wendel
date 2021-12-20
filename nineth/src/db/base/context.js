const CRUD = require("../interfaces/crud");
const { isObject } = require("../../helpers/manipulate");

class Context extends CRUD{
    #database = null;

    constructor(strategy){
        super();

        this.#database = strategy;
    }

    async create(item){
        return await this.#database.create(item);
    }

    async read(search, page, limit){
        page = parseInt(page) || 0;
        limit = parseInt(limit) || 1000;

        if(!isObject(search)) search = {};

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
}

module.exports = Context;
