const chista = require('../chista');

const UsersSignUp = require('../services/users/SignUp');
const UsersSignIn = require('../services/users/SignIn');

const TokenOperations = require('../services/tokens/TokenOperations');

function authContextBuilder(req, res) {
    const authorizationHeader = req.get('Authorization') || '';
    const token = authorizationHeader.replace('Bearer ', '');

    try {
        const decode = TokenOperations.validateToken(token);

        return decode;
    } catch (err) {
        res.json({
            status : 0,
            error  : {
                code   : err.code,
                fields : {}
            }
        });
    }
}

module.exports = {
    signUp : chista.makeServiceRunner(UsersSignUp, req => req.body),
    signIn : chista.makeServiceRunner(UsersSignIn, req => req.body, authContextBuilder)
};
