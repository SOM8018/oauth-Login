var passport = require ("passport");
var keys = require("./key");
var user = require("../models/user-model");

var GoogleStrategy = require("passport-google-oauth20");

passport.use(new GoogleStrategy({

    //option for google strategy
    callbackURL:'/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret :keys.google.clientSecret,

},(accessToken,refreshToken,profile,done)=>{
        //passport callback
        
        // console.log('passportfunction');
        // console.log(profile);
        new user({
            username:profile.displayName,
            googleId:profile.id,
        }).save().then((newuser)=>{

            console.log("New user created "+newuser);
        });

})

)