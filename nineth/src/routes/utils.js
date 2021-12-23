const { HTTPMethod } = require('http-method-enum');
const { join } = require('path');
const Base = require('./base');

class Utils extends Base{
    constructor(){
        super();
    }

    coverage(){
        return {
            path: '/coverage/{param*}',
            method: HTTPMethod.GET,
            config: {
                auth: false,
                tags: ['api'],
                description: 'Show coverage',
                notes: 'You can see the tests',
            },
            handler: {
                directory: {
                    path: join(__dirname, '../../coverage'),
                    redirectToSlash: true,
                    index: true
                }
            }
        };
    }
}

module.exports = Utils;
