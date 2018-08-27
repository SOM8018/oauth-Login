var router = require("express").Router();
var passport= require("passport");


//auth login
router.get("/login",(req,res)=>
{
    res.render('login');
});
//auth logout
router.get('/logout',(req,res)=>
{
    //handle logout with passport
    res.send("logging out");
});

//auth with google
router.get('/google',passport.authenticate('google',
{

    scope:['profile','email'] 
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>
{
    // res.send("you are on the callback url");
   // res.send(req.user);
   res.redirect("/profile/");

});

//fb routes
router.get('/facebook', passport.authenticate('facebook'), function(req, res){});

router.get('/facebook/callback', passport.authenticate('facebook'), function(req, res){
    res.send("you are on the callback url");
});
//export the module 
module.exports=router;