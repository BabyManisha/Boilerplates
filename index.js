//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');
require("dotenv").config()

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Authentication Middileware
const isAuthenticated = require("./routes/isAuthenticated");

const app = express();

mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// User Session Initiatives
app.use(session({
    secret: process.env.MYSECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/user", isAuthenticated, userRoutes);
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});
app.get("/", (req, res) => {
    res.render('login');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on: http://localhost:${process.env.PORT || 3000}`);
});