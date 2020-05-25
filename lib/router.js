const express     = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.post('/users/signUp', controllers.users.create);

module.exports = router;
