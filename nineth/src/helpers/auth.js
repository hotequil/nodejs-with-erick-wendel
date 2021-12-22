const Joi = require('joi');

const headersValidation = () => {
    return {
        headers: Joi.object({ authorization: Joi.string().required() }).unknown()
    }
};

const headersFake = () => {
    return {
        headers: {
            authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6MSwiaWF0IjoxNjQwMTg5MDQwfQ.lx1LLPvGIvF29P5fPDNxG6x8urcnl_9zMJIpLecAgpU'
        }
    }
}

module.exports = { headersValidation, headersFake };
