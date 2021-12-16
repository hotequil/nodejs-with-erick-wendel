class NotImplementedError extends Error{
    constructor(args){
        if(!Array.isArray(args)) args = [];

        const hasArgs = !!args.length;
        const messgage = hasArgs ? `with arguments: ${args.map(item => JSON.stringify(item)).join(', ')}` : '';

        super(`Code not implemented ${messgage}`);
    }
}

module.exports = NotImplementedError;
