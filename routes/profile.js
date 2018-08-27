var router = require("express").Router();

var authCheck = (req,res,next)=>{
    if(!req.user){
        //if user is not logged in
        res.redirect('/auth/login');
    }else{
        //if loggedin
        next();
    }
   
}
router.get('/',authCheck,(req,res)=>{
// res.send("hello "+ req.user.username +" How are you ?");
res.render('profile',{usersent:req.user});//usersent is the any name varivale and we get the value by req.user
});

module.exports = router;