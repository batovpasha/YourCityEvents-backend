const { Events } = require('../../db');

module.exports = {
    async create(name, description, startDate, endDate, country, city, location, price, photoUrl, organizerId) {
        await Events().insert({
            name,
            description,
            start_date   : startDate,
            end_date     : endDate,
            country,
            city,
            location,
            price,
            photo_url    : photoUrl,
            organizer_id : organizerId
        });
    },

    findAll() {
        return Events().select('*');
    },

    async getEventInfoById(id) {
        const [ event ] = await Events()
            .select({
                userName    : 'users.name',
                userId      : 'users.id',
                startDate   : 'events.start_date',
                endDate     : 'events.end_date',
                photoUrl    : 'events.photo_url',
                location    : 'events.location',
                description : 'events.description',
                name        : 'events.name',
                price       : 'events.price'
            })
            .where('events.id', id)
            .join('users', 'events.organizer_id', 'users.id');

        if (event) {
            const [ { eventVisitorsCount } ] = await Events()
                .join('event_visitors', 'events.id', 'event_visitors.event_id')
                .count('event_id', { as: 'eventVisitorsCount' });

            event.eventVisitorsCount = eventVisitorsCount;

            return event;
        }

        return null;
    }
};
