const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    const userDetails = req.user;
    res.send({
        isAuthenticated: true,
        todos: userDetails['todos']
    });
});

router.post('/', (req, res) => {
    const userDetails = req.user;
    const todo = req.body.newItem;
    userDetails.todos.push(todo);
    userDetails.save();
    res.send({
        isAuthenticated: true,
        todos: userDetails['todos']
    });
});

router.post('/update', (req, res) => {
    const userDetails = req.user;
    const todo = req.body.newItem;
    const index = req.body.index;
    userDetails.todos.splice(index, 1);
    userDetails.todos.splice(index, 0, todo);
    userDetails.save();
    res.send({
        isAuthenticated: true,
        todos: userDetails['todos']
    });
});

router.post('/delete', (req, res) => {
    const userDetails = req.user;
    const todoIndex = req.body.index;
    userDetails.todos.splice(todoIndex, 1);
    userDetails.save();
    res.send({
        isAuthenticated: true,
        todos: userDetails['todos']
    });
});

module.exports = router;