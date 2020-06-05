const { EventVisitors } = require('../../db');

module.exports = {
    async find(userId, eventId) {
        const [ row ] = await EventVisitors()
            .where({
                event_id : eventId,
                user_id  : userId
            });

        return row;
    }
};
