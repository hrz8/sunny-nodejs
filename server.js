const express = require('express');
const { getHandler, createHandler, updateHandler, deleteHandler } = require('./handlers');

const PORT_EXPRESS = 4001;

const app = express();

app.use(express.json()); // application level middleware

const handler0 = function(req, res, next) {
    const now = new Date().getTime();
    res.locals.now = now;

    console.log('mulai...');
    // res.send('selesai');
    next();
}

const handler1 = function(req, res) {
    const now = new Date().getTime();
    const start = res.locals.now;

    console.log(`selesai pada ${now - start}...`);
    // res.send('selesai');
}

app.get('/api/v1/users', handler0, getHandler, handler1);
app.post('/api/v1/users', createHandler);
app.put('/api/v1/users/:id', updateHandler);
app.delete('/api/v1/users/:id', deleteHandler);

app.listen(PORT_EXPRESS, function() {
    console.log('server berhasil dijalankan');
});
