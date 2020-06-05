const BaseService = require('../BaseService');

const Events = require('../../repositories/events');
const EventVisitors = require('../../repositories/event-visitors');

class Show extends BaseService {
    validate(data) {
        const validationRules = {
            id : [ 'required', 'positive_integer' ]
        };

        return this.doValidation(data, validationRules);
    }

    async execute(data) {
        this.logger.info('Events.List');

        const { id } = data;
        const eventInfo = await Events.getEventInfoById(id);
        const isVisitor = await EventVisitors.find(this.context.userId, id);

        return {
            status : 1,
            data   : {
                ...eventInfo,
                isVisitor : !!isVisitor
            }
        };
    }
}

module.exports = Show;

