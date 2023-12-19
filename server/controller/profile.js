const Profile = require("../model/Profile")
const User = require("../model/User");


exports.updateProfile = async (req , res) => {

    try {
        const id = req.user.id;
        const {dob , about  , contactno , age  , gender , address} = req.body;
  
        const userDetails = await User.findById(id);

        const profileDetails = await Profile.findById(userDetails.profile);
        console.log(profileDetails);

        profileDetails.dob = dob;
        profileDetails.about = about;
        profileDetails.phoneNo = contactno;
        profileDetails.age = age;
        profileDetails.gender = gender
        profileDetails.address = address;
        profileDetails.myPic= null;

        await profileDetails.save();

        return res.status(200).json({ 
            success:true,
            message:"Profile updated successfully",
            profileDetails,

        })

    } catch (error) {
        
        return res.status(500).json({ 
            success:false,
            message:"Unable to update profile",
        })
    }

}


exports.getProfile = async (req , res) => { 


     try {

        const id = req.user.id;

        const userDetails = await User.findById(id).populate("profile").exec();
           
        return res.status(200).json({
            success:true,
            message:"Profile fetched successfully",
            userDetails,
        })

     }catch (error) {

        return res.status(500).json({ 
            success:false,
            message:"Unable to get profile",
        })
          
    }
}


// orderdetails ke baad
exports.getProoducts = async (req , res) =>{

   try {
    
    const id = req.user.id;

    const userDetails = await User.findById(id).populate("product").exec();

    return res.status(200).json({ 
        success:true,
        message:"Products fetched successfully",
        userDetails,
    })

   } catch (error) {
    
    return res.status(500).json({ 
        success:false,
        message:"Unable to get products",
    })

   }
}



