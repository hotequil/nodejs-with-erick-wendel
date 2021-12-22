const mapRoutes = (instance, methods) => methods.map(method => instance[method]());

const isObject = property => typeof(property) === 'object';

const now = (isString = false) => {
    const time = Date.now();

    return isString ? time.toString() : time;
};

const stringToBoolean = property => {
    if(property === "false") return false;
    if(property === "true") return true;

    throw new Error("Isn't a correct string");
}

module.exports = { mapRoutes, isObject, now, stringToBoolean };
