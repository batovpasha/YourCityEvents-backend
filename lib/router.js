const express     = require('express');
const controllers = require('./controllers');

const {
    upload,
    auth
} = require('./middleware');

const router = express.Router();

// Users routes
router.get('/users/:id', auth, controllers.users.show);
router.post('/users/signUp', controllers.users.signUp);
router.post('/users/signIn', controllers.users.signIn);

// Events routes
router.post('/events/create', auth, upload.single('photo'), controllers.events.create);
router.get('/events/list', auth, controllers.events.list);
router.get('/events/:id', auth, controllers.events.show);

module.exports = router;
