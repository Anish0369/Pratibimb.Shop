const Category =  require("../model/Category");

exports.createCategory = async( req , res ) => {  

try {
            
    const {name} = req.body;

    if(!name){
        return res.status(400).json({
            success: false,
            message: "Please enter the category name",  });
        }
            
        const newc = await Category.create({
                name : name })
              
        console.log(newc);
            
        return res.status(200).json({
            success:true,
            message:"Category created successfully"  })

            } 
            
catch (error) {
                    
        console.log(error.message);
        
        return res.status(500).json({
            success:false,
            message:"Category cannot be created"  })
    

    }

}


exports.deleteCategoryByName = async( req , res ) => {

try{

const { name } = req.body;

console.log(name);


const response = await Category.deleteOne({ name : name });

if( !response ){
    return res.status(400).json({
        success: false,
        message: "Unable to delete category",  });
}

return res.status(200).json({
    success: true,
    message: "Category deleted successfully",  });

}

catch(error){

    console.log(error.message);
        
    return res.status(500).json({
        success:false,
        message:"Category cannot be deleted"  })

}

}

exports.deleteCategoryById = async( req , res ) => {

    try{
    
    const targetId = req.params.id;
    
    const response = await Category.findByIdAndDelete( targetId );
    
    if( !response ){
        return res.status(400).json({
            success: false,
            message: "Unable to delete category",  });
    }
    
    return res.status(200).json({
        success: true,
        message: "Category deleted successfully",  });
    
    }
    
    catch(error){
    
        console.log(error.message);
            
        return res.status(500).json({
            success:false,
            message:"Category cannot be deleted"  })
    
    }
    
    }


exports.getAllCategories = async( req , res ) => { 

     try{

        const categories = await Category.find();

        if( categories.length === 0 ){
            return res.status(404).json({
                success: false,
                message: "Unable to fetch categories",  });
        }

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            categories  });

        }

catch(error){

    console.log(error.message);
                
    return res.status(500).json({
        success:false,
        message:"Categories cannot be fetched"  })

    }
}


// exports.getCategoryByName = async( req , res ) => {

//     try{

//         const { Cname } = req.query.Name;
//         console.log(Cname);

//         const response = await Category.findOne({ name : Cname }).populate("Products");

//         if( !response ){
//             return res.status(404).json({
//                 success: false,
//                 message: "Unable to fetch category",  });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Category fetched successfully",
//             response  });

//         }
        
// catch(error){

//     console.log(error.message);
                
//     return res.status(500).json({
//         success:false,
//         message:"Category cannot be fetched"  })

//     }
        
// }

// exports.getCategoryByName = async (req, res) => {
//     try {
//       const categoryName = req.query.category;
//       console.log(categoryName); // Logging the category name
  
//       const categoryDetails = await Category.findOne({ name : categoryName });
//         console.log(categoryDetails);
//     //    console.log(response);

//       if (!categoryDetails) {
//         return res.status(404).json({
//           success: false,
//           message: 'Unable to fetch category',
//         });
//       }
  
//       return res.status(200).json({
//         success: true,
//         message: 'Category fetched successfully',
//         categoryDetails,
//       });
//     } catch (error) {
//       console.log(error.message);
//       return res.status(500).json({
//         success: false,
//         message: 'Category cannot be fetched',
//       });
//     }
//   };

//  on hold
exports.getCategoryByName = async (req, res) => {
    try {
      const categoryName = req.query.category;
      console.log(categoryName); // Logging the category name
  
      const categoryDetails = await Category.findOne({ name: categoryName }).populate("products");
      console.log(categoryDetails);
  
      if (!categoryDetails) {
        return res.status(404).json({
          success: false,
          message: 'Unable to fetch category',
        });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Category fetched successfully',
        response: categoryDetails, // Corrected variable name
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: 'Category cannot be fetched',
      });
    }
  };
  