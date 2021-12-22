const Bcrypt = require('bcrypt');
const SALT = 3;

class Password{
    static hash(password){
        return Bcrypt.hash(password, SALT);
    }

    static compare(password, hash){
        return Bcrypt.compare(password, hash);
    }
}

module.exports = Password;
