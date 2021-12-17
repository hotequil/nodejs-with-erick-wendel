const { ok } = require('assert');
const Postgres = require('../db/postgres');
const Context = require('../db/base/context.js');
const context = new Context(new Postgres());

describe('Postgres', function(){
    this.timeout(Infinity);

    it('Postgres should connect when init', async () => {
        const isConnected = await context.isConnected();

        ok(isConnected);
    });
});
