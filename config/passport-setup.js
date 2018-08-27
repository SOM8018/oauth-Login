var passport = require ("passport");
var keys = require("./key");
var user = require("../models/user-model");

var GoogleStrategy = require("passport-google-oauth20");
var fbtokenstategy = require('passport-facebook').Strategy;
//serialize
passport.serializeUser((user,done)=>{
done(null,user.id);
});
//deserialize
passport.deserializeUser((id,done)=>{
    user.findById(id).then((user)=>{
        done(null,user);
    })
});


passport.use(new GoogleStrategy({

    //option for google strategy
    callbackURL:'/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret :keys.google.clientSecret,

},(accessToken,refreshToken,profile,done)=>{

    console.log(profile);// to check the json format of google id profile
          //Check a user is already refgistered or not               //passport callback
         user.findOne({googleId:profile.id}).then((currentuser)=>{
                if(currentuser){
                    //already have the user
                    console.log('user is ',currentuser);
                    done(null,currentuser); //means done go to next stsage looklike next();
                }
                //if not exist then create a new user
                else{

                //save to mongodb new user                                                      // console.log(profile);
                new user({
                    username:profile.displayName,
                    googleId:profile.id,
                    thumbnail: profile._json.image.url,
                    email: profile.emails[0].value,
                    }).save().then((newuser)=>{

                    console.log("New user created "+newuser);
                    done(null,newuser);
                    });

                    }
                });                                                    
                                                                   // console.log('passportfunction');
            

    })

);

//fbpassport strategy
passport.use('facebooktoken',new fbtokenstategy({
    callbackURL:'auth/facebook/callback',
    clientID: keys.facebook.clientID,
    clientSecret :keys.facebook.clientSecret
},(accessToken,refreshToken,profile,done)=>
    {
             console.log('profile is '+profile);
            console.log('accessToken is '+accessToken);
            console.log('refreshToken is '+refreshToken);
    }



));


