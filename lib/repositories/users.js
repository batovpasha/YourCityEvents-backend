const { Users } = require('../../db');

module.exports = {
    async create(email, passwordHash, name, surname, bio, country, city) {
        await Users().insert({
            email,
            password_hash : passwordHash,
            name,
            surname,
            bio,
            country,
            city
        });
    },

    async findByEmail(email) {
        const [ user ] = await Users().where({ email });

        return user;
    },

    async findById(id) {
        const [ user ] = await Users().where({ id });

        return user;
    },

    async getEventsToVisit(userId) {
        return Users()
            .select({
                id        : 'events.id',
                startDate : 'events.start_date',
                photoUrl  : 'events.photo_url',
                country   : 'events.country',
                city      : 'events.city',
                name      : 'events.name'
            })
            .join('event_visitors', 'users.id', 'event_visitors.user_id')
            .join('events', 'event_visitors.event_id', 'events.id')
            .where('users.id', userId);
    }
};

