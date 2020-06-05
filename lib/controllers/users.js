const chista = require('../chista');

const UsersSignUp = require('../services/users/SignUp');
const UsersSignIn = require('../services/users/SignIn');
const UsersShow   = require('../services/users/Show');

module.exports = {
    signUp : chista.makeServiceRunner(UsersSignUp, req => req.body),
    signIn : chista.makeServiceRunner(UsersSignIn, req => req.body),
    show   : chista.makeServiceRunner(
        UsersShow,
        req => ({ id: req.params.id }),
        req => ({ userId: req.params.userId })
    )
};
