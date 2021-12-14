const { ok } = require('assert');
const service = require('./languages-service');
const messages = require('./messages');

describe('LanguagesService', () => {
    it('Should find a language when was called', async () => {
        const results = await service.list('JavaScript');

        ok(results.length);
    });

    it('Should create a language when create was called', async () => {
        const response = await service.create({ name: 'Go', extension: '.go' });

        ok(response === messages.SUCCESS);
    });

    it('Should remove a language when delete was called with a id', async () => {
        const response = await service.delete(4);

        ok(response === messages.DELETED);
    });
});
