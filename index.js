//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config()

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let msg = "Hello World!";

app.get('/', (req, res) => {
    res.render('home', {msg: msg});
});

app.post('/', (req, res) => {
    msg = req.body.name;
    res.render('home', {msg: msg});
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on: http://localhost:${process.env.PORT || 3000}`);
});