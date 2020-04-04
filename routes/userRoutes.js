const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get('/', (req, res) => {
    const userDetails = req.user;
    res.render('home', {todos: userDetails['todos']});
});

router.post('/', (req, res) => {
    const userDetails = req.user;
    const todo = req.body.newItem;
    userDetails.todos.push(todo);
    userDetails.save();
    res.redirect('/user/');
});

router.post('/delete', (req, res) => {
    const userDetails = req.user;
    const todoIndex = req.body.index;
    userDetails.todos.splice(todoIndex, 1);
    userDetails.save();
    res.redirect('/user/');
});

module.exports = router;