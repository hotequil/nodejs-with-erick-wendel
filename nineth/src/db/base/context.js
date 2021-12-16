class Context{
    #database = null;

    constructor(strategy){
        this.#database = strategy;
    }

    create(item){
        this.#database.create(item);
    }

    read(search){
        this.#database.read(search);
    }

    update(id, item){
        this.#database.update(id, item);
    }

    delete(id){
        this.#database.delete(id);
    }
}

module.exports = Context;
