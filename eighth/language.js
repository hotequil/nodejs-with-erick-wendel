class Language{
    constructor({ name, extension, id }){
        this.name = name;
        this.extension = extension;

        if(id) this.id = id;
    }
}

module.exports = Language;
