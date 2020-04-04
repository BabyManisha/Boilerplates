//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config()

// Models
const Todo = require("./models/todo");
const DefaultTodos = require("./models/defaultTodos");

const app = express();

mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


Todo.find({}, (err, todos) => {
    if(err){
        console.log("Something went wrong!!", err);
    }else if(todos && todos.length <=0) {
        Todo.insertMany(DefaultTodos, (err, newtodos) => {
            if(err){
                console.log("Something went wrong while initiating default todos!!", err);
            }else{
                console.log("Initiated ToDos");
            }
        });
    }
});


app.get('/', (req, res) => {
    Todo.find({}, (err, todos) => {
        if(err){
            todos = [];
            console.log("Something wentt wrong while getting Todos");
        }else{
            res.render('home', {todos: todos});
        }
    });
});

app.post('/', (req, res) => {
    const todo = new Todo({ todo: req.body.newItem})
    todo.save((err, newtodo) => {
        res.redirect('/');
    });
});

app.post('/delete', (req, res) => {
    const id = req.body.id;
    Todo.findByIdAndDelete({_id: id}, (err, todo) => {
        if(err){
            console.log("Error while deleting", err);
        }else{
            res.redirect('/');
        }
    })
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on: http://localhost:${process.env.PORT || 3000}`);
});