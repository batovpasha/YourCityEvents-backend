const bcrypt = require('bcryptjs');

const { SALT_ROUNDS } = require('../../config/password');

module.exports = {
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hash(password, salt);

        return hash;
    },

    checkPassword(password, passwordHash) {
        return bcrypt.compare(password, passwordHash);
    }
};
