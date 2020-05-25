const logger = require('pino')();
const app    = require('./app');

const {
    HOST,
    PORT
} = require('./config/server');

(() => {
    app.listen(PORT, HOST, () => {
        logger.info(`Server starts at ${HOST}:${PORT}`);
    });
})();

