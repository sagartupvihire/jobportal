import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";

export const register = async (req, res) => {
    try {
        const { name, email, password, phonenumber ,file,role} = req.body;
        console.log(name, email, password, phonenumber);
        if (!name || !email || !password || !phonenumber) {
            return res.status(400).json({ message: "All fields are required" });
        }   
         

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        if(file){
            req.body.file = file;
            const uploadres = await cloudinary.uploader.upload(file, {
                upload_preset: "ml_default",
            })
            file = uploadres.secure_url;
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password : hashPassword,
            phonenumber,
            role,
            profilepic : file
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        res.status(201).json({ user, token });
    } catch (error) {
        console.log("error in register controller", error);
        
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) { 
            return res.status(400).json({ message: "User does not exist", success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        if(user.role !== role){
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        console.log("token", token);
        
        res.cookie("token", token, {    
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        res.status(200).json({ user, token });

    } catch (error) {
        console.log("error in login controller", error);
        
        res.status(400).json({ error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("error in logout controller", error);
        
        res.status(400).json({ error: error.message });
    }
};  



export const checkAuth = async (req, res) => {
    try {
       
        if(!req.userId){
            return res.status(400).json({
                message: "User is not authenticated",
                user: req.userId
            })
        }

        const userData = await User.findById(req.userId);
        console.log(req.userId);
        return res.status(200).json({
            message: "User is authenticated",
            user: req.userId,
            userData
        })
    } catch (error) {
        console.log("Error in checkAuth controller", error);
        return res.status(400).json({
            message: "Error in checkAuth controller",
            error
        });
    }
}