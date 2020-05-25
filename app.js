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
app.use(urlencoded);
app.use(json);
app.use(cors);

// Mount routes
app.use('/api/v1', router);

module.exports = app;
