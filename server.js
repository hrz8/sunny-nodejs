const express = require('express');
const { getHandler, createHandler, updateHandler, deleteHandler } = require('./handlers');

const PORT_EXPRESS = 4001;

const app = express();

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
    next();
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

app.use(express.json()); // application level middleware/third party middleware
app.use(appLevelMiddlewareBefore);

app.get('/api/v1/users', handler0, getHandler, handler1);
app.post('/api/v1/users', createHandler);
app.put('/api/v1/users/:id', updateHandler);
app.delete('/api/v1/users/:id', deleteHandler);
app.get('/api/v1/articles', getHandler);
app.post('/api/v1/articles', createHandler);
app.put('/api/v1/articles/:id', updateHandler);
app.delete('/api/v1/articles/:id', updateHandler);
app.all("*", function(req, res) {
    res.status(404).json({
        message: 'url tidak ditemukan',
    });
});

app.use(appLevelMiddlewareAfter);
app.use(errorHandler);

app.listen(PORT_EXPRESS, function() {
    console.log('server berhasil dijalankan');
});
