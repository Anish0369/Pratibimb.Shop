const mongoose = require("mongoose");

require("dotenv").config();

exports.dbConnect = () =>{

mongoose.connect( process.env.mongourl , {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        connectTimeoutMS: 10000,
} )

.then( console.log("DB connected successfully") )

.catch((error)=>{ console.log("Error in connecting to DB")
                  console.log(error)
                  process.exit(1) })

}