const chista = require('../chista');

const EventsCreate = require('../services/events/Create');
const EventsList   = require('../services/events/List');

module.exports = {
    create : chista.makeServiceRunner(
        EventsCreate,
        req => ({ ...req.body, photoFilename: req.file.filename }),
        req => ({ userId: req.params.userId })
    ),
    list : chista.makeServiceRunner(EventsList)
};
