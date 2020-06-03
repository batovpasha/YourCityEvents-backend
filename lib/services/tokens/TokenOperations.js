const jwt               = require('jsonwebtoken');
const ServiceBaseModule = require('chista/ServiceBase');
const X                 = require('chista/Exception').default;
const logger            = require('pino')();

const ServiceBase = ServiceBaseModule.default;

const { JsonWebTokenError, TokenExpiredError } = jwt;

const { SECRET } = require('../../../config/token');

class TokenOperations extends ServiceBase {
    constructor(...args) {
        super(...args);
        this.logger = logger;
    }

    generateToken(user) {
        const dataToSign = { userId: user.id };

        return jwt.sign(dataToSign, SECRET);
    }

    static validateToken(token) {
        try {
            const decode = jwt.verify(token, SECRET);

            return decode;
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                throw new X({
                    code   : 'TOKEN_EXPIRED',
                    fields : {}
                });
            }

            if (err instanceof JsonWebTokenError && err.message === 'invalid signature') {
                throw new X({
                    code   : 'TOKEN_INVALID_SIGNATURE',
                    fields : {}
                });
            }
        }
    }
}

module.exports = TokenOperations;
