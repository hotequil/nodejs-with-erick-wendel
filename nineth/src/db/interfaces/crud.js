const NotImplementedError = require('../base/not-implemented-error');

class CRUD{
    create(...args){
        throw new NotImplementedError(args);
    }

    read(...args){
        throw new NotImplementedError(args);
    }

    update(...args){
        throw new NotImplementedError(args);
    }

    delete(...args){
        throw new NotImplementedError(args);
    }
}

module.exports = CRUD;
