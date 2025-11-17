const rateLimit = require('express-rate-limit');

const SPANS = {
    ONE_SECOND: 1 * 1000,
    ONE_MINUTE: 60 * 1000,
    FIFTEEN_MINUTES: 15 * 60 * 1000,
    ONE_HOUR: 60 * 60 * 1000,
    ONE_DAY: 24 * 60 * 60 * 1000,
};

const limiter = (max, span = 'FIFTEEN_MINUTES') => rateLimit({
    windowMs: SPANS?.[span] || SPANS.FIFTEEN_MINUTES,
    max,
    message: "<img src='https://media1.tenor.com/m/002yhC8NXy8AAAAC/balthazar-kaamelot.gif' />",
});

module.exports = limiter;