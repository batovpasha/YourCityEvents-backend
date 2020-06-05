const X = require('chista/Exception').default;

const BaseService = require('../BaseService');

const EventVisitors = require('../../repositories/event-visitors');

class Unsubscribe extends BaseService {
    validate(data) {
        const validationRules = {
            eventId : [ 'required', 'positive_integer' ]
        };

        return this.doValidation(data, validationRules);
    }

    async execute(data) {
        this.logger.info('Events.Unsubscribe');

        const { eventId } = data;
        const isAlreadyVisited = await EventVisitors.find(this.context.userId, eventId);
        if (!isAlreadyVisited) {
            throw new X({
                code   : 'NOT_FOUND',
                fields : {
                    eventId : 'NOT_FOUND'
                }
            });
        }

        await EventVisitors.delete(this.context.userId, eventId);

        return {
            status : 1,
            data   : {}
        };
    }
}

module.exports = Unsubscribe;

