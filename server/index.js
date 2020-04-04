const { resolve } = require('path');
// const history = require('connect-history-api-fallback');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');
const configureAPI = require('./configure');
require('dotenv').config();

// Routes
const authRoutes = require("../routes/authRoutes");
const userRoutes = require("../routes/userRoutes");

// Authentication Middileware
const isAuthenticated = require("../routes/isAuthenticated");

const PORT = process.env.PORT;

const app = express();

// APIs
configureAPI(app);

mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

// UI
const publicPath = resolve(__dirname, '../dist');
const staticConf = { maxAge: '1y', etag: false };

app.use(express.static(publicPath, staticConf));
app.use(bodyParser.urlencoded({extended: true}));
// app.use('/', history());

// User Session Initiatives

app.use(session({
    secret: process.env.MYSECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});
app.use("/user", isAuthenticated, userRoutes);

app.get('/', (req,res) => {
    if(req.isAuthenticated()){
        res.redirect('/user/');
    }else{
        res.send({
            isAuthenticated: false
        });
    }
});

// Application Server
app.listen(PORT, () => {
    console.log(`Server is listening on: http://localhost:${PORT}`);
});
