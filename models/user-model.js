var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const userSchema = new Schema({

    username : String,
    googleId : String,
    thumbnail : String,
    email : String,

});

var user = mongoose.model('user',userSchema);

module.exports= user;