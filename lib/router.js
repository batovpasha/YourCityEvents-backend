const express     = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.post('/users/signUp', controllers.users.create);
router.post('/users/signIn', controllers.users.signIn);

module.exports = router;
