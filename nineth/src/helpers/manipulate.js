const mapRoutes = (instance, methods) => methods.map(method => instance[method]());

module.exports = { mapRoutes };
