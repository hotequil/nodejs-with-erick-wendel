const Base = require('./base');
const { HTTPMethod } = require('http-method-enum');
const Joi = require('joi');

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
            config: {
                validate: {
                    query: {
                        page: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(1000),
                        name: Joi.string().min(2).max(50),
                        extension: Joi.string().min(2).max(3)
                    }
                }
            },
            handler: request => {
                try{
                    const { query } = request;
                    const { page, limit, name, extension } = query;
                    const search = {};

                    if(name) search.name = { $regex: `.*${name}*.` };
                    if(extension) search.extension = { $regex: `.*${extension}*.` };

                    return this.#context.read(search, page, limit);
                } catch(error){
                    console.error(error);

                    return 'Server error';
                }
            }
        }
    }

    create(){
        return {
            path: '/languages',
            method: HTTPMethod.POST,
            config: {
                validate: {
                    payload: {
                        name: Joi.string().min(2).max(50).required(),
                        extension: Joi.string().min(2).max(3).required()
                    }
                }
            },
            handler: request => {
                try{
                    return this.#context.create(request.payload);
                } catch(error){
                    console.error(error);

                    return 'Create error';
                }
            }
        }
    }
}

module.exports = Languages;
