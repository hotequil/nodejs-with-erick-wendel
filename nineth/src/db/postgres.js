const CRUD = require('./interfaces/crud');

class Postgres extends CRUD{
    constructor(){
        super();
    }

    create(item){
        console.log(`Created item in Postgres: ${JSON.stringify(item)}`);
    }
}

module.exports = Postgres;
