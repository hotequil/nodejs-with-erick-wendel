const { readyState } = require("../db/enums/mongo");

const isConnected = connection => connection.readyState === readyState.CONNECTED;

module.exports = { isConnected };
