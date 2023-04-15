const { getHandler, createHandler, updateHandler, deleteHandler } = require('../handlers');

const articlesRouter = require('express').Router();

articlesRouter.get('/', getHandler);
articlesRouter.post('/', createHandler);
articlesRouter.put('/:id', updateHandler);
articlesRouter.delete('/:id', deleteHandler);

module.exports = {
    articlesRouter
};