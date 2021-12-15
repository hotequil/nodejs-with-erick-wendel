const { program } = require('commander');
const service = require('./languages-service');
const Language = require('./language');

const main = async () => {
    program.version('v1.0.0')
           .requiredOption('-n, --name [value]', "Name")
           .requiredOption('-e, --extension [value]', "Extension")
           .requiredOption('-c, --create', "Create")
           .parse(process.argv);

    try{
        const language = new Language(program.opts())
        const response = await service.create(language);

        console.log(response);
    } catch(error){
        console.error(error);
    }
}

main();
