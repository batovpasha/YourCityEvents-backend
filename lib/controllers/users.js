const chista = require('../chista');

const UsersCreate = require('../services/users/Create');

module.exports = {
    create : chista.makeServiceRunner(UsersCreate, req => req.body)
};
