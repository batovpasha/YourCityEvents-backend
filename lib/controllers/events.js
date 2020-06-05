const chista = require('../chista');

const EventsCreate    = require('../services/events/Create');
const EventsList      = require('../services/events/List');
const EventsShow      = require('../services/events/Show');
const EventsSubscribe = require('../services/events/Subscribe');
const EventsUnsubscribe = require('../services/events/Unsubscribe');

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
    ),
    subscribe : chista.makeServiceRunner(
        EventsSubscribe,
        req => req.body,
        req => ({ userId: req.params.userId })
    ),
    unsubscribe : chista.makeServiceRunner(
        EventsUnsubscribe,
        req => req.body,
        req => ({ userId: req.params.userId })
    )
};
