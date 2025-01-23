
import Cloudinary from "../lib/cloudinary.js";
import User from "../model/user.model.js";

export const updateProfile = async (req, res) => {
    console.log("in updateProfile controller");
    try {
        const { name, email, password, phonenumber,bio, skills,authUserId } = req.body;
        console.log(name, email, password, phonenumber,bio, skills);
    
        console.log("authUserId",authUserId);
        
        const user = await User.findById(authUserId);
        console.log("req.user.id",req.userId);
        console.log("user._id in update profile",user._id);
        
        if(user._id.toString() !== req.userId.toString()) {
            return res.status(400).json({ message: "You are not authorized to update this profile", success: false });
        }

        if (!user) { 
            return res.status(400).json({ message: "User does not exist", success: false });
        }
        const skillsArray = skills?.split(",")
        console.log("skillsArray",skillsArray);
        
        if(name){
            user.name = name;
        }
        if(email){
            user.email = email;
        }
        if(password){
            user.password = password;
        }
        if(phonenumber){
            user.phonenumber = phonenumber;
        }
        if(bio){
            user.profile.bio = bio;
        }
        if(skillsArray){
            user.profile.skills = user.profile.skills.concat(skillsArray);
        }

        await user.save();

        return res.status(201).json({ user : user, message: "Profile updated successfully", success: true });
        
    } catch (error) {
        console.log("error in updateProfile controller", error);
        res.status(400).json({ error: error.message });
        
    }
}

export const updateProfilePic = async (req, res) => {
    console.log("in updateProfilePic controller");
    const {profilePic} = req.body;
    console.log("profilePic",profilePic);
    try{
        const userId = req.userId;
        
        if(!profilePic){
            return res.status(400).json({
                message: "Profile pic is required"
            })
            
        }
        const uploadRes = await Cloudinary.uploader.upload(profilePic)
        const updateUser = await User.findByIdAndUpdate(userId, {
            profilepic: uploadRes.secure_url
        },
        {new: true}
    )
        return res.status(200).json({
            message: "Profile pic updated successfully",
            user: updateUser
        })

    } catch(error) {
        console.log("Error in updateProfile controller", error);
        return res.status(400).json({
            message: "Error updating profile pic",
            error
        });
    }
}

export const uploadResume = async (req, res) => {
    console.log("in uploadResume controller");
    const userId = req.userId;
    try {
        const { resume } = req.body;
        
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User Not Found" });
        }
        if (!resume) {
            return res.status(400).json({ message: "Resume is required" });
        }

        const uploadRes = await Cloudinary.uploader.upload(resume);

        user.profile.resume = uploadRes.secure_url;
        await user.save();
        console.log("resume uploaded successfully", uploadRes.secure_url);
        
        return res.status(200).json({ message: "Resume uploaded successfully", resume: uploadRes.secure_url });
    } catch (error) {
        console.log("Error in uploadResume controller", error);
        return res.status(400).json({ message: "Error uploading resume", error });
    }
}