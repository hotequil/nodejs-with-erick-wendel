const { ok, deepEqual } = require('assert');
const { HTTPMethod } = require('http-method-enum');
const { StatusCode } = require('status-code-enum');
const api = require('../api');
let app = null;
const LANGUAGE_TO_CREATE = { name: 'TypeScript', extension: '.ts' };
const INVALID_LANGUAGE_TO_CREATE = { name: 'Go' };
let idToEdit = null;
const LANGUAGE_UPDATE = { extension: '.php' };
let idToDelete = null;
const { headersFake } = require('../helpers/auth');

describe('Api', function(){
    this.beforeAll(async () => {
        app = await api();

        const responseToEdit = await app.inject({ method: HTTPMethod.POST, url: '/languages', payload: LANGUAGE_TO_CREATE, ...headersFake() });
        const responseToDelete = await app.inject({ method: HTTPMethod.POST, url: '/languages', payload: LANGUAGE_TO_CREATE, ...headersFake() });

        idToEdit = JSON.parse(responseToEdit.payload)._id;
        idToDelete = JSON.parse(responseToDelete.payload)._id;
    });

    it('Should get languages list when entering at route', async () => {
        const { statusCode, payload } = await app.inject({ method: HTTPMethod.GET, url: '/languages', ...headersFake() });

        ok(Array.isArray(JSON.parse(payload)));
        deepEqual(statusCode, StatusCode.SuccessOK);
    });

    it('Should return fifteen languages when entering at route with limit', async () => {
        const limit = 15;
        const { payload } = await app.inject({ method: HTTPMethod.GET, url: `/languages?limit=${limit}`, ...headersFake() });
        const list = JSON.parse(payload);

        ok(list.length === limit);
    });

    it('Should return the correct language when was called with a name', async () => {
        const name = 'Script';
        const { payload } = await app.inject({ method: HTTPMethod.GET, url: `/languages?name=${name}`, ...headersFake() });
        const list = JSON.parse(payload);

        ok(!!list.length);
    });

    it('Should create a language when was entering at route', async () => {
        const response = await app.inject({
            method: HTTPMethod.POST,
            url: '/languages',
            payload: LANGUAGE_TO_CREATE,
            ...headersFake()
        });

        const id = JSON.parse(response.payload)._id;

        ok(response.statusCode === StatusCode.SuccessOK && !!id);
    });

    it('Should return an error when try to create an invalid language', async () => {
        const response = await app.inject({
            method: HTTPMethod.POST,
            url: '/languages',
            payload: INVALID_LANGUAGE_TO_CREATE,
            ...headersFake()
        });

        ok(response.statusCode === StatusCode.ClientErrorBadRequest)
    });

    it('Should update a language when entering at route', async () => {
        const response = await app.inject({
            method: HTTPMethod.PATCH,
            url: `/languages/${idToEdit}`,
            payload: LANGUAGE_UPDATE,
            ...headersFake()
        });

        const payload = JSON.parse(response.payload);

        ok(response.statusCode === StatusCode.SuccessOK && !!payload.modifiedCount);
    });

    it("Shouldn't update a language with a invalid id when entering at route", async () => {
        const response = await app.inject({
            method: HTTPMethod.PATCH,
            url: `/languages/123abc`,
            payload: LANGUAGE_UPDATE,
            ...headersFake()
        });

        ok(response.statusCode === StatusCode.ServerErrorInternal);
    });

    it('Should delete a language when entering at route with id', async () => {
        const response = await app.inject({ method: HTTPMethod.DELETE, url: `/languages/${idToDelete}`, ...headersFake() });
        const { deletedCount } = JSON.parse(response.payload);

        ok(response.statusCode === StatusCode.SuccessOK && !!deletedCount);
    });

    it("Shouldn't delete a language when entering at route with invalid id", async () => {
        const response = await app.inject({ method: HTTPMethod.DELETE, url: '/languages/abc123', ...headersFake() });

        ok(response.statusCode === StatusCode.ServerErrorInternal);
    });
});
