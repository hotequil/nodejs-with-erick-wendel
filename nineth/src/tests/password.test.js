const { ok } = require('assert');
const PASSWORD = '1234';
const Password = require('../helpers/password');
let hash = null

describe('Password', function(){
    this.beforeEach(async () => hash = await Password.hash(PASSWORD));

    it('Should generate a hash by password when was called', async () => {
        ok(hash.length >= 8);
    });

    it('Should compare hash and password when was called', async () => {
        const isValid = await Password.compare(PASSWORD, hash);

        ok(isValid);
    });

    it('Should compare hash and wrong password when was called', async () => {
        const WRONG_PASSWORD = '12345678';
        const isInvalid = !(await Password.compare(WRONG_PASSWORD, hash));

        ok(isInvalid);
    });
});
