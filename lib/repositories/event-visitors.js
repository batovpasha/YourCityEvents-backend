const { EventVisitors } = require('../../db');

module.exports = {
    async find(userId, eventId) {
        const [ row ] = await EventVisitors()
            .where({
                event_id : eventId,
                user_id  : userId
            });

        return row;
    },

    async create(userId, eventId) {
        await EventVisitors().insert({
            user_id  : userId,
            event_id : eventId
        });
    },

    async delete(userId, eventId) {
        await EventVisitors()
            .where({
                event_id : eventId,
                user_id  : userId
            })
            .delete();
    }
};
