const { ok, deepEqual, notDeepEqual } = require('assert');
const Postgres = require('../db/postgres');
const Context = require('../db/base/context.js');
const context = new Context(new Postgres());
const LANGUAGE_TO_CREATE = { name: 'Rust', extension: '.rs' };
const LANGUAGE_TO_UPDATE = { name: 'Go', extension: '.go' };

describe('Postgres', function(){
    this.timeout(Infinity);
    this.beforeAll(async () => await context.connect());

    it('Postgres should connect when init', async () => {
        const isConnected = await context.isConnected();

        ok(isConnected);
    });

    it('Create should add a new language when was called', async () => {
        const language = LANGUAGE_TO_CREATE;
        const newLanguage = await context.create(language);

        delete newLanguage.id;

        deepEqual(language, newLanguage);
    });

    it('Should list at least a language when was called with a name as search', async () => {
        const { name } = LANGUAGE_TO_CREATE;
        const [language] = await context.read({ name });

        delete language.id;

        deepEqual(language, LANGUAGE_TO_CREATE);
    });

    it('Should update a language when was called with id', async () => {
        const languages = await context.read();
        const lastLanguage = languages[languages.length - 1];

        await context.update(lastLanguage.id, LANGUAGE_TO_UPDATE);

        delete lastLanguage.id;

        notDeepEqual(lastLanguage, LANGUAGE_TO_UPDATE);
    });

    it('Should remove a language when was called with id', async () => {
        const [firstLanguage] = await context.read();

        await context.delete(firstLanguage.id);

        const [newFirstLanguage] = await context.read();

        notDeepEqual(firstLanguage, newFirstLanguage);
    });
});
