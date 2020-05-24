const express = require('express');
const logger  = require('pino')();

const {
    json,
    urlencoded,
    cors
} = require('./lib/middleware');


// TODO: add basic routing

const {
    HOST,
    PORT
} = require('./config/server');

// Init express app
const app = express();

// Mount middleware
app.use(urlencoded);
app.use(json);
app.use(cors);
// TODO: add router mounting

app.listen(HOST, PORT, () => {
    logger.info(`Server starts at ${HOST}:${PORT}`);
});

module.exports = app;
