const chista = require('../chista');

const UsersCreate = require('../services/users/SignUp');
const UsersSignIn = require('../services/users/SignIn');

module.exports = {
    create : chista.makeServiceRunner(UsersCreate, req => req.body),
    signIn : chista.makeServiceRunner(UsersSignIn, req => req.body)
};
