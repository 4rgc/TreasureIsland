const crypto = require('crypto-js')
const salt = 'I@l=[c4)'
module.exports.getHashedPassword = (password) => {
    return crypto.SHA256(salt + password).toString();
}