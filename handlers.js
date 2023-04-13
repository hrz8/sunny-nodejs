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

const getHandler = function(req, res) {
    res.json(users);
};

const createHandler = function(req, res) {
    const requestJson = req.body;
    users.push(requestJson);
    res.status(204).send();
};

const updateHandler = function(req, res) {
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
};

const deleteHandler = function(req, res) {
    const { id } = req.params;
    const userIdx = users.findIndex((user) => user.id == id);
    if (userIdx < 0) {
        res.status(404).send();
        return;
    }
    users.splice(userIdx, 1);
    res.status(204).send();
};

module.exports = {
    getHandler,
    createHandler,
    updateHandler,
    deleteHandler,
};
