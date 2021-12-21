const { ok, deepEqual } = require('assert');
const { HTTPMethod } = require('http-method-enum');
const { StatusCode } = require('status-code-enum');
const api = require('../api');
let app;
const LANGUAGE_TO_CREATE = { name: 'TypeScript', extension: '.ts' };
const INVALID_LANGUAGE_TO_CREATE = { name: 'Go' };

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

    it('Should create a language when was entering at route', async () => {
        const response = await app.inject({
            method: HTTPMethod.POST,
            url: '/languages',
            payload: LANGUAGE_TO_CREATE
        });

        const id = JSON.parse(response.payload)._id;

        ok(response.statusCode === StatusCode.SuccessOK && !!id);
    });

    it('Should return an error when try to create an invalid language', async () => {
        const response = await app.inject({
            method: HTTPMethod.POST,
            url: '/languages',
            payload: INVALID_LANGUAGE_TO_CREATE
        });

        ok(response.statusCode === StatusCode.ClientErrorBadRequest)
    });
});
