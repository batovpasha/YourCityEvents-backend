const ChistaESModule = require('chista');
const logger         = require('pino')();

const Chista = ChistaESModule.default;

module.exports = new Chista({
    defaultLogger : (type, data) => {
        const logMethodName = {
            error : 'error',
            info  : 'info'
        }[type && type.toLowerCase()] || 'debug';

        logger[logMethodName](data); // use pino as default chista logger
    }
});
