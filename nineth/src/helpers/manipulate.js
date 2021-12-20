const mapRoutes = (instance, methods) => methods.map(method => instance[method]());

const isObject = property => typeof(property) === 'object';

module.exports = { mapRoutes, isObject };
