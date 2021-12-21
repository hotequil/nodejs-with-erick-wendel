const hapi = require('@hapi/hapi');
const app = new hapi.Server({ port: 4000 });
const Context = require('./db/base/context');
const Mongo = require('./db/mongo/mongo');
const languageSchema = require('./db/mongo/schemas/languages');
const { mapRoutes } = require('./helpers/manipulate');
const Languages = require('./routes/languages');
const Joi = require('joi');

const api = async () => {
    const connection = await Mongo.connect();
    const context = new Context(new Mongo(connection, languageSchema));

    app.validator(Joi);

    app.route([
        ...mapRoutes(new Languages(context), Languages.methods())
    ]);

    await app.start();

    return app;
};

module.exports = api;
