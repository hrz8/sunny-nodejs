const express = require('express');
const { getHandler, createHandler, updateHandler, deleteHandler } = require('./handlers');

const PORT_EXPRESS = 4001;

const app = express();

app.use(express.json());

app.get('/api/v1/users', getHandler);
app.post('/api/v1/users', createHandler);
app.put('/api/v1/users/:id', updateHandler);
app.delete('/api/v1/users/:id', deleteHandler);

app.listen(PORT_EXPRESS, function() {
    console.log('server berhasil dijalankan');
});
