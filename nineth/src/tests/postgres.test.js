const { ok, deepEqual } = require('assert');
const Postgres = require('../db/postgres');
const Context = require('../db/base/context.js');
const context = new Context(new Postgres());
const LANGUAGE = { name: 'Rust', extension: '.rs' };

describe('Postgres', function(){
    this.timeout(Infinity);
    this.beforeAll(async () => await context.connect());

    it('Postgres should connect when init', async () => {
        const isConnected = await context.isConnected();

        ok(isConnected);
    });

    it('Create should add a new language when was called', async () => {
        const language = LANGUAGE;
        const newLanguage = await context.create(language);

        delete newLanguage.id;

        deepEqual(language, newLanguage);
    });

    it('Should list at least a language when was called with a name as search', async () => {
        const { name } = LANGUAGE;
        const [language] = await context.read({ name });

        delete language.id;

        deepEqual(language, LANGUAGE);
    });
});
