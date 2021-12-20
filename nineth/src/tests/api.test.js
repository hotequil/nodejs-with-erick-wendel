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
});
