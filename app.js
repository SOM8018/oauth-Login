var express = require("express");
var ejs = require("ejs");
var mongoose=require("mongoose");
var keys = require("./config/key");
var cookieSession = require("cookie-session");
const passport = require("passport");
var session = require('express-session');
var app = express();
app.set('view engine','ejs');

//using passport session

//use cookie in browser
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys:[keys.session.cookiekey]
}));

//intialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI,()=>{

    console.log("connected to mongodb succesfully");
});

//set a path for home route
app.get("/",(req,res)=>
{
    res.render('home');
});

var authRoutes = require("./routes/auth-Routes");
app.use("/auth",authRoutes);

var passportsetup = require ("./config/passport-setup");

var profile = require("./routes/profile");
app.use("/profile",profile);

//set a port for the express 
app.listen(8080,()=>{

    console.log("server listen at 8080");
});
