const Base = require('./base');
const { HTTPMethod } = require('http-method-enum');
const Joi = require('joi');
const Boom = require('@hapi/boom');
const JWT = require('jsonwebtoken');
const { now } = require('../helpers/manipulate');

const USER = {
    username: 'test',
    password: 'test'
}

class Auth extends Base{
    #secret = null;

    constructor(secret){
        super();

        this.#secret = secret;
    }

    login(){
        return {
            path: '/login',
            method: HTTPMethod.POST,
            config: {
                tags: ['api'],
                description: 'Should make login and return token',
                notes: 'Receive username and password',
                auth: false,
                validate: {
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: request => {
                const { username, password } = request.payload;

                if(username !== USER.username || password !== USER.password) return Boom.unauthorized();

                return { token: JWT.sign({ username, id: now() }, this.#secret) };
            }
        }
    }
}

module.exports = Auth;
