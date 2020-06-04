const BaseService = require('../BaseService');
const Events = require('../../repositories/events');

class List extends BaseService {
    async execute() {
        this.logger.info('Events.List');

        const events = await Events.findAll();
        const dumpedEvents = events.map(event => ({
            id        : event.id,
            startDate : new Date(event.start_date).getTime(),
            photoUrl  : event.photo_url,
            country   : event.country,
            city      : event.city,
            name      : event.name
        }));

        return {
            status : 1,
            data   : dumpedEvents
        };
    }
}

module.exports = List;

