const assert = require('assert');
const { get } = require('../sixth/service');

describe('Posts', function(){
    let list = null;

    this.timeout(10000);
    this.beforeEach(() => list = []);
    // this.beforeAll(() => list = []);

    it('Should return at least 50 items when was called', async () => {
        list = await get();

        assert.ok(list.length >= 50);
    });

    it('Should return only items with "userId" 2 when was called', async () => {
        const userId = 2;

        list = await get(userId);

        const hasCorrectUserIds = list.every(item => item.userId === userId);

        assert.ok(hasCorrectUserIds);
    });
});
