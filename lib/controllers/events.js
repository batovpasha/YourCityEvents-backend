const chista = require('../chista');

const EventsCreate = require('../services/events/Create');

module.exports = {
    create : chista.makeServiceRunner(
        EventsCreate,
        req => ({ ...req.body, photoFilename: req.file.filename }),
        req => ({ userId: req.params.userId })
    )
};
