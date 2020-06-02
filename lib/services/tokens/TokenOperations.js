const jwt               = require('jsonwebtoken');
const ServiceBaseModule = require('chista/ServiceBase');
const X                 = require('chista/Exception');
const logger            = require('pino')();

const ServiceBase = ServiceBaseModule.default;

const { JsonWebTokenError, TokenExpiredError } = jwt;

const { SECRET } = require('../../../config/token');

const Users = require('../../repositories/users');

class TokenOperations extends ServiceBase {
    constructor(...args) {
        super(...args);
        this.logger = logger;
    }

    async generateToken(user) {
        const dataToSign = { userId: user.id };
        let secret = SECRET;
        secret += user.password_hash;
        secret += user.email;

        return jwt.sign(dataToSign, secret);
    }

    async validateToken(token) {
        try {
            const decodedData = jwt.decode(token);
            if (!decodedData) throw new JsonWebTokenError('invalid token');

            const { userId } = decodedData;
            const user = await Users.findById(userId);

            let secret = SECRET;
            secret += user.password_hash;
            secret += user.email;

            const decoded = await jwt.verify(token, secret);

            return decoded;
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                throw new X({
                    code   : 'TOKEN_EXPIRED',
                    fields : {}
                });
            }

            if (err instanceof JsonWebTokenError && err.message === 'invalid token') {
                throw new X({
                    code   : 'TOKEN_INVALID',
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
