const Base = require('./base');
const { HTTPMethod } = require('http-method-enum');

class Languages extends Base{
    #context = null;

    constructor(context){
        super();

        this.#context = context;
    }

    list(){
        return {
            path: '/languages',
            method: HTTPMethod.GET,
            handler: () => this.#context.read()
        }
    }
}

module.exports = Languages;
