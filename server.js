const http = require('http');

const express = require('express');

const PORT = 4000;

async function bodyParser(req) {
    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();
    const body = JSON.parse(data);
    return body;
}

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

http.createServer(async function(request, response) {
    if (request.url === '/api/v1/users' && request.method === 'POST') {
        // ngambil data "request"
        // tambah data "db"
        // balikin - no content
        const requestJson = await bodyParser(request);
        users.push(requestJson);
        response.writeHead(204);
        response.end();
    } else if (request.url.startsWith('/api/v1/users/') && request.method === 'PUT') {
        // ngambil data "request"
        // ngambil data "db" (sesuai "request")
        // update data "db" (sesuai "request")
        const requestJson = await bodyParser(request);
        const id = request.url.split('/')[2];
        const userIdx = users.findIndex((user) => user.id == id);
        if (userIdx < 0) {
            response.writeHead(404);
            response.end();
            return;
        }
        users[userIdx] = {
            id: Number(id),
            name: requestJson.name,
            age: requestJson.age,
        };
        response.writeHead(204);
        response.end();
    } else if (request.url.startsWith('/api/v1/users/') && request.method === 'DELETE') {
        const id = request.url.split('/')[2];
        const userIdx = users.findIndex((user) => user.id == id);
        if (userIdx < 0) {
            response.writeHead(404);
            response.end();
            return;
        }
        users.splice(userIdx, 1);
        // users.shift();
        response.writeHead(204);
        response.end();
    } else {
        response.writeHead(404);
        response.write('not found');
        response.end();
    }
}).listen(PORT);

console.log('selesai');
