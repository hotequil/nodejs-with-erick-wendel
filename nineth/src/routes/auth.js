const Base = require('./base');
const { HTTPMethod } = require('http-method-enum');
const Joi = require('joi');
const Boom = require('@hapi/boom');
const JWT = require('jsonwebtoken');
const Password = require('../helpers/password');

class Auth extends Base{
    #secret = null;
    #database = null;

    constructor(secret, database){
        super();

        this.#secret = secret;
        this.#database = database;
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
            handler: async request => {
                const { username, password } = request.payload;
                const [user] = await this.#database.read({ username });

                if(!user) return Boom.unauthorized("User doesn't exist");

                const match = await Password.compare(password, user.password);

                if(!match) return Boom.unauthorized("Username or password is wrong");

                return { token: JWT.sign({ username, id: user.id }, this.#secret) };
            }
        }
    }
}

module.exports = Auth;
