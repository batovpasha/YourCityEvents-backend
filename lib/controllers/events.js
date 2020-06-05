const chista = require('../chista');

const EventsCreate = require('../services/events/Create');
const EventsList   = require('../services/events/List');
const EventsShow   = require('../services/events/Show');

module.exports = {
    create : chista.makeServiceRunner(
        EventsCreate,
        req => ({ ...req.body, photoFilename: req.file.filename }),
        req => ({ userId: req.params.userId })
    ),
    list : chista.makeServiceRunner(EventsList),
    show : chista.makeServiceRunner(
        EventsShow,
        req => ({ id: req.params.id }),
        req => ({ userId: req.params.userId })
    )
};
