const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const router = express.Router();
const User = require("../models/user.js");
const DefaultTodos = require("../models/defaultTodos.js");

passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALL_BACK,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},function(accessToken, refreshToken, profile, cb) {
    saveUserDetails(accessToken, refreshToken, profile, cb, 'google');
}));

function saveUserDetails(accessToken, refreshToken, profile, cb, authType){
    const userDetails = {
        userId: profile.id,
        authType: authType,
        username: profile.displayName,
        profilePic: profile.photos && profile.photos.length ? profile.photos[0]['value'] : '',
    }
    User.findOrCreate(userDetails, function (err, user) {
        if(!user.addedDefaults){
            User.findByIdAndUpdate({_id: user._id},  { "$push": { "todos": DefaultTodos }, "addedDefaults": true} , (err, user1) => {
                if(err){
                    console.log("Something went wrong while initiating default todos!!", err);
                    return cb(err, user);
                }else{
                    console.log("Initiated ToDos");
                    return cb(err, user);
                }
            });
        }else{
            return cb(err, user);
        }
    });
}


// for GoogleOAuth2.0 -- STRATS
router.get('/google', 
    passport.authenticate("google", { scope: ['profile'] })
);

router.get('/google/secrets', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect to secrets.
        res.redirect('/');
    });
// for GoogleOAuth2.0 -- ENDs

module.exports = router;