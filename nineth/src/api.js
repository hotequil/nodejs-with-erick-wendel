const hapi = require('@hapi/hapi');
const app = new hapi.Server({ port: 4000 });
const Context = require('./db/base/context');
const Mongo = require('./db/mongo/mongo');
const languageSchema = require('./db/mongo/schemas/languages');
const { mapRoutes } = require('./helpers/manipulate');
const Languages = require('./routes/languages');
const Joi = require('joi');
const Swagger = require('hapi-swagger');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const Pack = require('../package');
const Auth = require('./routes/auth');
const AuthJwt = require('hapi-auth-jwt2');
const SECRET_KEY = 'HOTEQUIL';
const Postgres = require('./db/postgres/postgres');
const usersSchema = require('./db/postgres/schemas/users');

const api = async () => {
    if(!!app.info.started) return app;

    const connection = await Mongo.connect();
    const context = new Context(new Mongo(connection, languageSchema));
    const usersPostgres = await Postgres.connect(usersSchema);
    const contextUsersPostgres = new Context(new Postgres(usersPostgres.connection, usersPostgres.model));
    const AUTH_STRATEGY_NAME = 'auth-jwt';

    await app.register([
        AuthJwt,
        Inert,
        Vision,
        {
            plugin: Swagger,
            options: {
                info: {
                    title: 'API documentation',
                    version: Pack.version
                }
            }
        }
    ]);

    app.auth.strategy(AUTH_STRATEGY_NAME, 'jwt', {
        key: SECRET_KEY,
        validate: async decoded => {
            const [user] = await contextUsersPostgres.read({ id: decoded?.id });

            return { isValid: !!user };
        }
    });

    app.auth.default(AUTH_STRATEGY_NAME);

    app.validator(Joi);

    app.route([
        ...mapRoutes(new Languages(context), Languages.methods()),
        ...mapRoutes(new Auth(SECRET_KEY, contextUsersPostgres), Auth.methods())
    ]);

    await app.start();

    return app;
};

module.exports = api;
