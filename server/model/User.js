const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
firstName : {
    type:String,
    required:true,
    trim:true
},

lastName : {
    type:String,
    required:true,
    trim:true
},

email : {
    type:String,
    required:true,
    trim:true
},

password : {
    type:String,
    required:true,
    trim:true
    // make them unique 
    
},

accountType : {
    type:String,
    enum:["User" , "Admin"],
    default:"User"
},

token : {
    type:String,
},

profile:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Profile"
},

resetPasswordExpires: {
    type: Date ,  
},

product:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
}] 


});




userSchema.pre("save", function (next) {
    if (this.isModified("token")) {
        const currentDatetime = new Date();
        this.resetPasswordExpires = new Date(currentDatetime.getTime() + 5 * 60 * 1000); // Add 5 minutes
    }
    next();
});




module.exports = mongoose.model( "User" , userSchema );

// cross -- checked