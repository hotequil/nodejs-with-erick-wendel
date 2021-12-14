const axios = require('axios');
const URL = 'https://jsonplaceholder.typicode.com/posts';

const get = async userId => {
    let params = '';

    if(userId) params = `?userId=${userId}`;

    return (await axios.get(`${URL}${params}`)).data;
}

module.exports = { get };
