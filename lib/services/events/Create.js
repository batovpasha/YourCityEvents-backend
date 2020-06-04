const X = require('chista/Exception').default;

const BaseService = require('../BaseService');
const Events = require('../../repositories/events');

const { HOST, PORT } = require('../../../config/server');
const { PHOTOS_DIR } = require('../../../config/common');

class Create extends BaseService {
    validate(data) {
        const validationRules = {
            name          : [ 'required', 'string' ],
            description   : [ 'required', 'string' ],
            startDate     : [ 'required', 'positive_integer' ],
            endDate       : [ 'required', 'positive_integer' ],
            country       : [ 'required', 'string' ],
            city          : [ 'string' ],
            location      : [ 'required', 'string' ],
            price         : [ 'required', 'positive_integer' ],
            photoFilename : [ 'required', 'string' ]
        };

        return this.doValidation(data, validationRules);
    }

    async execute(data) {
        this.logger.info(data, 'Events.Create');

        const { name, description, startDate, endDate, country, city, location, price, photoFilename } = data;
        const photoUrl = `http://${HOST}:${PORT}/api/${PHOTOS_DIR}/${photoFilename}`;
        const organizerId = this.context.userId;
        const startDateISOString = new Date(startDate);
        const endDateISOString = new Date(endDate);
        await Events.create(
            name,
            description,
            startDateISOString,
            endDateISOString,
            country,
            city,
            location,
            price,
            photoUrl,
            organizerId
        );

        return {
            status : 1,
            data   : {
                name,
                description,
                startDate,
                endDate,
                country,
                city,
                location,
                price,
                photoUrl
            }
        };
    }
}

module.exports = Create;
