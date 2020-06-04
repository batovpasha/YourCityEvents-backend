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
    }
};
