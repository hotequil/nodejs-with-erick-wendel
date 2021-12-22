const Joi = require('joi');

const headersValidation = () => {
    return {
        headers: Joi.object({ authorization: Joi.string().required() }).unknown()
    }
};

const headersFake = () => {
    return {
        headers: {
            authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6MTY0MDE3NzMxMTQyMSwiaWF0IjoxNjQwMTc3MzExfQ.iMA_qD1ffktFU547LL07ws9A0woSfkOVngSug47nOD8'
        }
    }
}

module.exports = { headersValidation, headersFake };
