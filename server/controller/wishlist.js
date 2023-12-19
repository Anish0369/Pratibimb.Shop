const wishlist = require("../model/Wishlist");
const mongoose = require("mongoose");


exports.addFav = async (req, res) => { 

    try {
        
        const user_id = req.user.id;
        const {product_id} = req.body // Corrected: Extract product_id
            console.log(product_id);
            console.log(user_id);
    
       const pid =  new mongoose.Types.ObjectId(product_id);

        console.log(pid);

        console.log("step1");

        const response = await wishlist.findOne({ user: user_id });

        
        
        // console.log(response.product);

        // if (!response) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "No response"
        //     });
        // }

        // const updatedWishlist = await wishlist.findByIdAndUpdate(
        //     { user: user_id },
        //     { $push: { product : pid } },
        //     { new: true }
        // );


        const result = await wishlist.findOneAndUpdate(
            {_id:response._id},
            {$push:{product: product_id}},   // pid bhi add kar sakte ho
            {new:true},
        ).populate("product");

        console.log(result);

        // if (!updatedWishlist) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Not able to update the wishlist"
        //     });
        // }

        res.status(200).json({
            success: true,
            message: "Item added successfully"
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Unable to create wishlist"
        });


    }





}



exports.removeFav = async (req, res) => {
     
    try {
        
        const user_id = req.user.id;
        const {product_id} = req.body // Corrected: Extract product_id
            console.log(product_id);
            console.log(user_id);
    
       const pid =  new mongoose.Types.ObjectId(product_id);

        console.log(pid);

        console.log("step1");

        const response = await wishlist.findOne({ user: user_id });

        
        
        // console.log(response.product);

        // if (!response) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "No response"
        //     });
        // }

        // const updatedWishlist = await wishlist.findByIdAndUpdate(
        //     { user: user_id },
        //     { $push: { product : pid } },
        //     { new: true }
        // );


        const result = await wishlist.findOneAndUpdate(
            {_id:response._id},
            {$pull:{product: pid}},   // pid bhi add kar sakte ho // product_id bhi kar sakte ho 
            {new:true},
        ).populate("product");

        console.log(result);

        // if (!updatedWishlist) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Not able to update the wishlist"
        //     });
        // }

        res.status(200).json({
            success: true,
            message: "Item added successfully"
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Unable to create wishlist"
        });


    }
};
