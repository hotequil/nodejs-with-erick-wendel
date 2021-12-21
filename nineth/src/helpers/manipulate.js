const mapRoutes = (instance, methods) => methods.map(method => instance[method]());

const isObject = property => typeof(property) === 'object';

const now = (isString = false) => {
    const time = Date.now();

    return isString ? time.toString() : time;
};

module.exports = { mapRoutes, isObject, now };
