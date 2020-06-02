const X = require('chista/Exception').default;

const PasswordOperations = require('../passwords/PasswordOperations');
const Users = require('../../repositories/users');

class Create extends PasswordOperations {
    validate(data) {
        const validationRules = {
            email    : [ 'required', 'email' ],
            password : [ 'required', 'string', { min_length: 8 } ],
            name     : [ 'required', 'string' ],
            surname  : [ 'required', 'string' ],
            bio      : [ 'required', 'string' ],
            country  : [ 'required', 'string' ],
            city     : [ 'required', 'string' ]
        };

        return this.doValidation(data, validationRules);
    }

    async execute(data) {
        this.logger.info(data, 'Users.Create');

        const { email, password, name, surname, bio, country, city } = data;

        const user = await Users.findByEmail(email);
        if (user) {
            throw new X({
                code   : 'ALREADY_EXISTS',
                fields : {
                    email : 'ALREADY_EXISTS'
                }
            });
        }

        const passwordHash = await this.hashPassword(password);
        await Users.create(email, passwordHash, name, surname, bio, country, city);

        return {
            status : 1,
            data   : {
                email,
                name,
                surname,
                bio,
                country,
                city
            }
        };
    }
}

module.exports = Create;
