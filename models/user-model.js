var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const userSchema = new Schema({

    username : String,
    googleId : String,

});

var user = mongoose.model('user',userSchema);

module.exports= user;