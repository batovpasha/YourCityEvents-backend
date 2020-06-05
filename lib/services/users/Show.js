const X = require('chista/Exception').default;

const BaseService = require('../BaseService');

const Users = require('../../repositories/users');
const Events = require('../../repositories/events');

class Show extends BaseService {
    validate(data) {
        const validationRules = {
            id : [ 'required', 'positive_integer' ]
        };

        return this.doValidation(data, validationRules);
    }

    async execute(data) {
        this.logger.info('Users.Show');

        const { id } = data;
        const user = await Users.findById(id);
        if (!user) {
            throw new X({
                code   : 'NOT_FOUND',
                fields : {
                    id : 'NOT_FOUND'
                }
            });
        }

        const userOrganizedEvents = await Events.getByOrganizerId(id);

        const responseData = {
            ...user,
            organizedEvents : userOrganizedEvents.map(event => ({
                id        : event.id,
                startDate : new Date(event.start_date).getTime(),
                photoUrl  : event.photo_url,
                country   : event.country,
                city      : event.city,
                name      : event.name
            }))
        };

        if (id === this.context.userId) {
            responseData.eventsToVisit = (await Users.getEventsToVisit(id)).map(event => ({
                id        : event.id,
                startDate : new Date(event.startDate).getTime(),
                photoUrl  : event.photoUrl,
                country   : event.country,
                city      : event.city,
                name      : event.name
            }));
        }

        return {
            status : 1,
            data   : responseData
        };
    }
}

module.exports = Show;

