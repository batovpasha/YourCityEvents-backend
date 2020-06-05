const X = require('chista/Exception').default;

const BaseService = require('../BaseService');

const EventVisitors = require('../../repositories/event-visitors');

class Subscribe extends BaseService {
    validate(data) {
        const validationRules = {
            eventId : [ 'required', 'positive_integer' ]
        };

        return this.doValidation(data, validationRules);
    }

    async execute(data) {
        this.logger.info('Events.List');

        const { eventId } = data;
        const isAlreadyVisited = await EventVisitors.find(this.context.userId, eventId);
        if (isAlreadyVisited) {
            throw new X({
                code   : 'ALREADY_EXISTS',
                fields : {
                    eventId : 'ALREADY_EXISTS'
                }
            });
        }

        await EventVisitors.create(this.context.userId, eventId);

        return {
            status : 1,
            data   : {}
        };
    }
}

module.exports = Subscribe;

