const { Users } = require('../../db');

module.exports = {
    async create(email, passwordHash, name, surname, bio, country, city) {
        await Users().insert({
            email,
            password_hash : passwordHash,
            name,
            surname,
            bio,
            country,
            city
        });
    },

    async findByEmail(email) {
        const [ user ] = await Users().where({ email });

        return user;
    }
};

