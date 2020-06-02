const bcrypt            = require('bcryptjs');
const ServiceBaseModule = require('chista/ServiceBase');
const logger            = require('pino')();

const ServiceBase = ServiceBaseModule.default;

const {
    SALT_ROUNDS
} = require('../../../config/password');

class PasswordOperations extends ServiceBase {
    constructor(...args) {
        super(...args);
        this.logger = logger;
    }

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hash(password, salt);

        return hash;
    }

    compare(password, passwordHash) {
        return bcrypt.compare(password, passwordHash);
    }
}

module.exports = PasswordOperations;

