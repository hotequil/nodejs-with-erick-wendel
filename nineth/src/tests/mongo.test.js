const { ok } = require('assert');
const Context = require('../db/base/context');
const Mongo = require('../db/mongo');
const context = new Context(new Mongo());

describe('Mongo', function(){
    this.timeout(Infinity);
    this.beforeAll(async () => await context.connect());

    it('Should is connected when was called', async () => ok(await context.isConnected()));
});
