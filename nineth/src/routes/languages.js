const Base = require('./base');
const { HTTPMethod } = require('http-method-enum');
const Joi = require('joi');
const Boom = require('@hapi/boom');
const { headersValidation } = require('../helpers/auth');

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
                tags: ['api'],
                description: 'Should list languages',
                notes: 'Can use paginate, limit and search name or extension',
                validate: {
                    ...headersValidation(),
                    query: {
                        page: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(1000),
                        name: Joi.string().min(2).max(50),
                        extension: Joi.string().min(2).max(4)
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

                    return Boom.internal();
                }
            }
        }
    }

    create(){
        return {
            path: '/languages',
            method: HTTPMethod.POST,
            config: {
                tags: ['api'],
                description: 'Should create a new language',
                notes: 'Needs to receive a name and extension',
                validate: {
                    ...headersValidation(),
                    payload: {
                        name: Joi.string().min(2).max(50).required(),
                        extension: Joi.string().min(2).max(4).required()
                    }
                }
            },
            handler: request => {
                try{
                    return this.#context.create(request.payload);
                } catch(error){
                    console.error(error);

                    return Boom.internal();
                }
            }
        }
    }

    update(){
        return {
            path: '/languages/{id}',
            method: HTTPMethod.PATCH,
            config: {
                tags: ['api'],
                description: 'Should update a existing language',
                notes: 'Must have an id in params route and receive name or extension in body',
                validate: {
                    ...headersValidation(),
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        name: Joi.string().min(2).max(50),
                        extension: Joi.string().min(2).max(4)
                    }
                }
            },
            handler: ({ params, payload }) => {
                try{
                    return this.#context.update(params.id, payload);
                } catch(error){
                    console.error(error);

                    return Boom.internal();
                }
            }
        }
    }

    delete(){
        return {
            path: '/languages/{id}',
            method: HTTPMethod.DELETE,
            config: {
                tags: ['api'],
                description: 'Should delete a language by id',
                notes: 'Must receive an id at route params',
                validate: {
                    ...headersValidation(),
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: ({ params }) => {
                try{
                    return this.#context.delete(params.id);
                } catch(error){
                    console.error(error);

                    return Boom.internal();
                }
            }
        }
    }
}

module.exports = Languages;
