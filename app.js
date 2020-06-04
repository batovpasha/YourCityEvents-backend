const path    = require('path');
const express = require('express');

const {
    json,
    urlencoded,
    cors
} = require('./lib/middleware');

const router = require('./lib/router');

// Init express app
const app = express();

// Mount middleware
app.use(json);
app.use(urlencoded);
app.use(cors);

// Mount routes
app.use('/api/v1', router);
app.use('/api/static', express.static(path.join(__dirname, 'static')));

module.exports = app;
