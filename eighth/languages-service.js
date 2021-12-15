const { readFileSync, writeFileSync } = require('fs');
const messages = require('./messages');

class LanguagesService{
    #NAME_FILE = 'database.json';
    #LAST_ID = null;

    async list(search = ''){
        const list = await this.#get();

        return list.filter(language => language.name.toLowerCase().includes(search.toLowerCase()));
    }

    async create(language){
        const list = await this.list();

        this.#LAST_ID = Math.max(...list.map(item => item.id)) || 0;

        return await this.#write({ ...language, id: ++this.#LAST_ID });
    }

    async update(id, language){
        const list = await this.list();
        const idsList = list.map(item => item.id);
        const languageIndex = idsList.indexOf(id);

        if(languageIndex === -1) throw new Error(messages.ERROR);

        list.splice(languageIndex, 1, { id, ...language });

        return await this.#writeAll(list, messages.UPDATED);
    }

    async delete(id){
        const list = await this.list();
        const ids = list.map(item => item.id);
        const positionId = ids.indexOf(id);

        if(positionId < 0) throw new Error(messages.ERROR);

        list.splice(positionId, 1);

        return await this.#writeAll(list, messages.DELETED);
    }

    async #get(){
        const file = await readFileSync(this.#NAME_FILE, 'utf8');

        return JSON.parse(file.toString());
    }

    async #write(language){
        const list = await this.list();

        return await this.#writeAll([...list, language], messages.SUCCESS);
    }

    async #writeAll(languages, message){
        await writeFileSync(this.#NAME_FILE, JSON.stringify(languages));

        return message;
    }
}

module.exports = new LanguagesService();
