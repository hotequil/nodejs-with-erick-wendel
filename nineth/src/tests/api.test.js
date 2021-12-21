const { ok, deepEqual } = require('assert');
const { HTTPMethod } = require('http-method-enum');
const { StatusCode } = require('status-code-enum');
const api = require('../api');
let app;

describe('Api', function(){
    this.beforeAll(async () => app = await api());

    it('Should get languages list when entering at route', async () => {
        const { statusCode, payload } = await app.inject({ method: HTTPMethod.GET, url: '/languages' });

        ok(Array.isArray(JSON.parse(payload)));
        deepEqual(statusCode, StatusCode.SuccessOK);
    });

    it('Should return fifteen languages when entering at route with limit', async () => {
        const limit = 15;
        const { payload } = await app.inject({ method: HTTPMethod.GET, url: `/languages?limit=${limit}` });
        const list = JSON.parse(payload);

        ok(list.length === limit);
    });

    it('Should return the correct language when was called with a name', async () => {
        const name = 'Script';
        const { payload } = await app.inject({ method: HTTPMethod.GET, url: `/languages?name=${name}` });
        const list = JSON.parse(payload);

        ok(!!list.length);
    });
});
