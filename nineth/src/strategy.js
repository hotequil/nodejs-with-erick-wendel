const Context = require('./db/base/context');
const Mongo = require('./db/mongo');
const Postgres = require('./db/postgres');
const mongoContext = new Context(new Mongo());
const postgresContext = new Context(new Postgres());

// mongoContext.create({ name: 'test1' });
// postgresContext.create({ name: 'test2' });
// mongoContext.read('test');
