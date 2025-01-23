import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            console.log("No token found in cookies");
            return res.status(401).json({ message: "No authentication token found" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded) {
            console.log("Token verification failed");
            return res.status(401).json({ message: "Invalid authentication token" });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            console.log("User not found");
            return res.status(401).json({ message: "User not found" });
        }
        req.userId = user._id;
        console.log("isAuthenticated middleware", req.userId);
        next();
    } catch (error) {
        console.log("error in isAuthenticated middleware", error);
        res.status(401).json({ message: "Unauthorized" });
    }
};
