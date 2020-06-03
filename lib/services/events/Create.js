const X = require('chista/Exception').default;

const BaseService = require('../BaseService');
const Users = require('../../repositories/users');

const { checkPassword } = require('../../utils/passwords');

class Create extends BaseService {
    validate(data) {
        const validationRules = {
            email    : [ 'required', 'email' ],
            password : [ 'required', 'string', { min_length: 8 } ]
        };

        return this.doValidation(data, validationRules);
    }

    async execute(data) {
        this.logger.info(data, 'Users.SignIn');

        const { email, password } = data;

        const user = await Users.findByEmail(email);
        if (!user) {
            throw new X({
                code   : 'NOT_FOUND',
                fields : {
                    email : 'NOT_FOUND'
                }
            });
        }

        const isCorrectPassword = await checkPassword(password, user.password_hash);
        if (!isCorrectPassword) {
            throw new X({
                code   : 'BAD_CREDENTIALS',
                fields : {
                    password : 'BAD_CREDENTIALS'
                }
            });
        }

        const token = this.generateToken(user);

        return {
            status : 1,
            data   : {
                token
            }
        };
    }
}

module.exports = Create;
