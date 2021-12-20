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
            handler: request => {
                try{
                    const { query } = request;
                    const { page, limit } = query;

                    delete query.page;
                    delete query.limit;

                    return this.#context.read(query, page, limit);
                } catch(error){
                    console.error(error);

                    return 'Server error';
                }
            }
        }
    }
}

module.exports = Languages;
