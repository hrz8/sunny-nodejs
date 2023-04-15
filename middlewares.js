
const appLevelMiddlewareBefore = function(req, res, next) {
    console.log('app level middleware before');

    next();
};

const appLevelMiddlewareAfter = function(req, res, next) {
    console.log('app level middleware after');
    next();
};

const handler0 = function(req, res, next) {
    const now = new Date().getTime();
    res.locals.now = now;

    console.log('mulai...');
    // res.send('selesai');
    next();
}

const handler1 = function(req, res, next) {
    const now = new Date().getTime();
    const start = res.locals.now;

    console.log(`selesai pada ${now - start}...`);
    // res.send('selesai');
}

const errorHandler = function(err, req, res, next) {
    if (err.message === 'validation error') {
        res.status(400).json({
            message: 'validation error'
        });

        return;
    }
    res.status(500).json({
        message: 'error'
    });
}

module.exports = {
    appLevelMiddlewareBefore,
    appLevelMiddlewareAfter,
    handler0,
    handler1,
    errorHandler,
}