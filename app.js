var express = require("express");
var ejs = require("ejs");
var mongoose=require("mongoose");
var keys = require("./config/key");
var app = express();
app.set('view engine','ejs');


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


//set a port for the express 
app.listen(8080,()=>{

    console.log("server listen at 8080")
});
