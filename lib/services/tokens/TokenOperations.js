const jwt         = require('jsonwebtoken');
const ServiceBase = require('chista/ServiceBase');
const X           = require('chista/Exception');

const {
    SECRET
} = require('../../../config/token');

class TokenOperations extends ServiceBase {
    async generateToken(dataToSign, user) {
        // TODO: implement this method
    }

    async validateToken(token) {
        // TODO: implement this method
    }
}

module.exports = TokenOperations;
