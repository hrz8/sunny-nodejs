const express = require('express');
const { usersRouter } = require('./routes/users');
const { articlesRouter } = require('./routes/articles');
const { appLevelMiddlewareBefore, appLevelMiddlewareAfter, errorHandler } = require('./middlewares');

const PORT_EXPRESS = 4001;

const app = express();

app.set('view engine', 'ejs');

app.use(express.json()); // application level middleware/third party middleware
app.use(appLevelMiddlewareBefore);

app.get('/test-ejs/:name', function(req, res) {
    res.render('index.ejs', {
        name: req.params.name
    });
});
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/articles', articlesRouter);
app.use(function(req, res) {
    res.status(404).json({
        message: 'url tidak ditemukan',
    });
});


app.use(appLevelMiddlewareAfter);
app.use(errorHandler);

app.listen(PORT_EXPRESS, function() {
    console.log('server berhasil dijalankan');
});
