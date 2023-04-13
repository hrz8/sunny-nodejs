const http = require('http');

const express = require('express');

const PORT_EXPRESS = 4001;

// ENDPOINTS
// GET: /users -> untuk melihat semua users
//   request:
//     -
//   response:
//     [{ "id": 1, "name": "maroon", "age": 19 }, { "id": 2, "name": "five", "age": 19 }]
// POST: /users -> untuk membuat user
//   request:
//     - { "name": "someone", "age": 20 }
//   response:
//     - no content 204
// PUT: /users/:id -> untuk mengupdate user
//   request:
//     - { "name": "someone", "age": 20 }
//   response:
// DELETE: /users -> untuk menghapus user

const users = [
    {
        id: 1,
        name: "maroon",
        age: 19
    },
    {
        id: 2,
        name: "five",
        age: 19
    }
];

const app = express();

app.use(express.json());

app.get('/api/v1/users', function(req, res) {
    res.json(users);
});

app.post('/api/v1/users', function(req, res) {
    const requestJson = req.body;
    users.push(requestJson);
    res.status(204).send();
});

app.put('/api/v1/users/:id', function(req, res) {
    const requestJson = req.body;
    const { id } = req.params;
    const userIdx = users.findIndex((user) => user.id == id);
    if (userIdx < 0) {
        res.status(404).send();
        return;
    }
    users[userIdx] = {
        id: Number(id),
        name: requestJson.name,
        age: requestJson.age,
    };
    res.status(204).send();
});

app.delete('/api/v1/users/:id', function(req, res) {
    const { id } = req.params;
    const userIdx = users.findIndex((user) => user.id == id);
    if (userIdx < 0) {
        res.status(404).send();
        return;
    }
    users.splice(userIdx, 1);
    res.status(204).send();
});

app.listen(PORT_EXPRESS);

console.log('selesai');
