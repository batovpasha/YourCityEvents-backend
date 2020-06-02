const knex = require('./db');

module.exports = {
    Users : () => knex('users')
};
