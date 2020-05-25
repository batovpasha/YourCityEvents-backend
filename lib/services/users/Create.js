const X = require('chista/Exception');

const BaseService = require('../BaseService');

class Create extends BaseService {
    // TODO: implement validation
    validate(data) {
        const validationRules = {
            name : [ 'required', 'string' ]
        };

        return this.doValidation(data, validationRules);
    }

    async execute(data) {
        // TODO: implement service logic
        this.logger.info(data, 'Users.Create');

        return {
            status : 1,
            data
        };
    }
}

module.exports = Create;
