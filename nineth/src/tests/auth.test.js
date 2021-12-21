const { ok } = require('assert');
const api = require('../api');
const { HTTPMethod } = require("http-method-enum");
const { StatusCode } = require("status-code-enum");
let app = null;

describe('Authentication', function(){
    this.beforeAll(async () => app = await api());

    it('Should get a token when entering at route', async () => {
        const response = await app.inject({
            method: HTTPMethod.POST,
            url: '/login',
            payload: {
                username: 'test',
                password: 'test'
            }
        });

        const { token } = JSON.parse(response.payload);

        ok(response.statusCode === StatusCode.SuccessOK && !!token);
    });
});
