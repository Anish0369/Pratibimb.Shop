const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    
age : {
    type : Number,
    trim : true
},

dob : {
    type : Date,
    trim : true
},

gender : {
    type : String,
},

address : {
    type : String,
    trim : true
},

myPic : {
    type:String,
},

phoneNo : {
    type : Number,
    trim : true,
},

about : {
    type : String,
},


});


module.exports = mongoose.model( "Profile" , profileSchema );








