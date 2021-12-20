class Base{
    static methods(){
        return Object.getOwnPropertyNames(this.prototype).filter(method => method !== 'constructor');
    }
}

module.exports = Base;
