const express = require('express');
const app = express();
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const cors = require("cors");
require('dotenv').config();
const database = require("./config/database");
database.dbConnect();


app.use(
    cors()
);

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));



cloudinaryConnect();
const Product = require("./model/Product");
const PORT = process.env.port || 4000 ;
const coookieParser = require("cookie-parser");
const userRoutes = require("./routes/User");
const productRoutes = require("./routes/Product");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/Order");

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(coookieParser());  
app.use("/api/v1" , userRoutes);
app.use("/api/v1/product" , productRoutes);
app.use("/api/v1/category" , categoryRoutes);
app.use("/api/v1/order" , orderRoutes);


// "//api.v1/au"

app.listen(PORT ,  ()=> {
    console.log(`Server is running on port ${PORT}`);
})

app.get("/", (req, res) => {
    return res.json({
        success: true, 
        message: "Your server is running...",
    })
})

