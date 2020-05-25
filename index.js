const logger = require('pino')();

(() => {
    try {
        require('./app');
    } catch (err) {
        logger.fatal(err);
        process.exit(1);
    }
})();

