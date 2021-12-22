const { ok } = require('assert');
const api = require('../api');
const { HTTPMethod } = require("http-method-enum");
const { StatusCode } = require("status-code-enum");
let app = null;
const Context = require('../db/base/context');
const Postgres = require('../db/postgres/postgres');
const usersSchema = require('../db/postgres/schemas/users');
let context = null;
const USER = { username: 'test', password: '1234' };
const USER_DB = { ...USER, password: '$2b$04$UJBGP/vKk3/pEk/hR7zwq.9ZnqAALknaUPB4tLL0iwnRG0.Beddiu' };

describe('Authentication', function(){
    this.beforeAll(async () => {
        app = await api();

        const { connection, model } = await Postgres.connect(usersSchema);

        context = new Context(new Postgres(connection, model));

        await context.update(null, USER_DB, true);
    });

    it('Should get a token when entering at route', async () => {
        const response = await app.inject({
            method: HTTPMethod.POST,
            url: '/login',
            payload: USER
        });

        const { token } = JSON.parse(response.payload);

        ok(response.statusCode === StatusCode.SuccessOK && !!token);
    });

    it("Shouldn't make login when entering at route", async () => {
        const response = await app.inject({
            method: HTTPMethod.POST,
            url: '/login',
            payload: { ...USER, password: '0000' }
        });

        const payload = JSON.parse(response.payload);

        ok(payload.statusCode === StatusCode.ClientErrorUnauthorized);
    });
});
