const { ok, deepEqual } = require('assert');
const Context = require('../db/base/context');
const Mongo = require('../db/mongo');
const context = new Context(new Mongo());
const LANGUAGE_TO_CREATE = { name: 'C#', extension: '.cs' };

describe('Mongo', function(){
    this.timeout(Infinity);
    this.beforeAll(async () => await context.connect());

    it('Should is connected when was called', async () => ok(await context.isConnected()));

    it('Should create a new language when was called', async () => {
        const { name, extension } = await context.create(LANGUAGE_TO_CREATE);

        deepEqual({ name, extension }, LANGUAGE_TO_CREATE);
    });
});
