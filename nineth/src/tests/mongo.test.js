const { ok, deepEqual } = require('assert');
const Context = require('../db/base/context');
const Mongo = require('../db/mongo');
const context = new Context(new Mongo());
const LANGUAGE_TO_CREATE = { name: 'C#', extension: '.cs' };
const LANGUAGE_TO_INIT_CREATE = { name: 'Go', extension: '.go' };
const LANGUAGE_TO_UPDATE = { name: 'Python', extension: '.py' };
let idToUpdate = null;

describe('Mongo', function(){
    this.timeout(Infinity);

    this.beforeAll(async () => {
        await context.connect();

        for(let index = 0; index < 10; index++){
            const result = await context.create(LANGUAGE_TO_INIT_CREATE);

            idToUpdate = result._id;
        }
    });

    it('Should is connected when was called', async () => ok(await context.isConnected()));

    it('Should create a new language when was called', async () => {
        const { name, extension } = await context.create(LANGUAGE_TO_CREATE);

        deepEqual({ name, extension }, LANGUAGE_TO_CREATE);
    });

    it('Should get a list when was called with a search', async () => {
        const [{ name, extension }] = await context.read({ name: LANGUAGE_TO_CREATE.name });

        deepEqual({ name, extension }, LANGUAGE_TO_CREATE);
    });

    it('Should get a list when was called with other parameters', async () => {
        const limit = 4;
        const { name } = LANGUAGE_TO_INIT_CREATE;
        const list = await context.read({ name }, 2, limit);

        ok(list.length === limit && list[0].name === name);
    });

    it('Should update a language when was called', async () => {
        await context.update(idToUpdate, LANGUAGE_TO_UPDATE);

        const [{ name, extension }] = await context.read({ _id: idToUpdate });

        deepEqual(LANGUAGE_TO_UPDATE, { name, extension });
    });
});
