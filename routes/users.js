const { getHandler, createHandler, updateHandler, deleteHandler } = require('../handlers');
const { handler0, handler1 } = require('../middlewares');

const usersRouter = require('express').Router();

usersRouter.get('/', handler0, getHandler, handler1);
usersRouter.post('/', createHandler);
usersRouter.put('/:id', updateHandler);
usersRouter.delete('/:id', deleteHandler);

module.exports = {
    usersRouter
};