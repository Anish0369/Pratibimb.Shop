const Review = require("../model/Review")
const User = require('../model/User');
const mongoose = require("mongoose");
const Product = require("../model/Product");


exports.createRev = async (req, res) => {
    try {
      const user_id = req.user.id; // Assuming you have access to the user's ID
  
      const { rating, review, product_id } = req.body;
         
        if (!rating || !review || !product_id) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"  });

    }

     if( !user_id ){
        return res.status(404).json({
            success:false,
            message:"User not found"  })
       }
       

      const existingReview = await Review.findOne({
        user: user_id,
        product: product_id,
        });

        if (existingReview) {
            return res.status(400).json({
            success: false,
            message: "You have already reviewed this product"  });

        }

      // Create a new Review using the Review model
      const newReview = new Review({
        user: user_id,
        review: review,
        rating: rating,
        product: product_id  });
  
      const savedReview = await newReview.save();
         

     // update the products average rating 
        const result = await Review.aggregate([
            {
                    $match :{
                          product : new mongoose.Types.ObjectId(product_id)
                    }
            },

            {

                    $group : {

                        _id : null,

                        averageRating : { $avg : "$rating"},

                    }
            },

        ])

       
        const averageRating = result[0].averageRating;
    
        console.log( "rating avg" , averageRating);

        const product = await Product.findById(product_id);

        product.averageRating = averageRating;

        await product.save();
               
      if (!savedReview) {
        return res.status(400).json({
          success: false,
          message: "Unable to create review"   });
      }
  
      return res.status(200).json({
        success: true,
        message: "Review created successfully",
        review: savedReview   });


    } 
    
    catch (error) {
      console.log(error);
  
      return res.status(500).json({
        success: false,
        message: error.message  });
    }
  
}


exports.getAverageRating = async (req, res) => {

    try {

      const product_id = req.body.product_id

      const result = await Review.aggregate([
         {
                 $match :{
                    product : new mongoose.Types.ObjectId(product_id)
                 }
         },

         {
                  
                 $group : {
                     
                     _id : null,
                     averageRating : { $avg : "$rating"},
                
                 }
         },
         
      ])

        
        if(result.length > 0 ){
            res.status(200).json({
                success:true,
                message:"Average rating fetched successfully",
                averageRating : result[0].averageRating   })
        }else{
            return res.status(400).json({
                success:true,
                message:"Average rating fetched successfully"  })
        }    


}catch(error){
        
    console.log(error);

    return res.status(500).json({
        success:false,
        message:error.message,  })
    } 

 }


exports.getReviews = async (req, res) => { 
    
    try {
    
        const allReviews =  await Review.find({})
                                      .populate({
                                        path : "user",
                                        select : "firstName lastName email" })
                                      .populate(
                                        {
                                            path : "product",
                                            select : "name" })
                                        .exec();

        return res.status(200).json({
            success:true,
            message:"Reviews fetched successfully",
            allReviews,
        })
    }catch(error){

        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }    
 }

 // get review by id 

exports.getReviewById = async (req, res) => {       

try {
    
    const pid = req.params.id;

    const review = await Review.find({ product : pid })
                                   .populate({
                                       path : "user",
                                       select : "firstName lastName email" })
                                   .populate(
                                       {
                                           path : "product",
                                           select : "name" })
                                       .exec();

        if( !review ){
            return res.status(402).json({
                success: false,
                message: "Cannot find reviews for this product"   })
        }

        else{
            return res.status(200).json({
            success:true,
            message:"Review fetched successfully",
            review,  })
    }

    }
    
    catch (error) {
        
        return res.status(500).json({
            success:false,
            message:"Review fetching unsuccessfully"   })

    }

    }