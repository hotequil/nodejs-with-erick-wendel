const CRUD = require('./interfaces/crud');

class Mongo extends CRUD{
    constructor(){
        super();
    }

    create(item){
        console.log(`Created item in Mongo: ${JSON.stringify(item)}`);
    }
}

module.exports = Mongo;
