import Company from "../model/company.model.js";
import Cloudinary from "../lib/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyname, description, email, location, website } = req.body;
        // if (!companyname || !description || !location || !website || !linkedin) {
        //     return res.status(400).json({ message: "All fields are required" });
        // }
        console.log(companyname, description, email, location, website);
        const companyExists = await Company.findOne({ companyname });
        if (companyExists) {
            return res.status(400).json({ message: "Company already exists" });

        }

        const company = await Company.create({
            companyname : companyname ||"",
            description : description ||"",
            email : email ||"",
            location : location ||"",
            website : website ||"",
            
            createdBy: req.userId
        });

        res.status(201).json({ message: "Company registered successfully", company });
    } catch (error) {
        console.log("error in registerCompany controller", error);
        res.status(400).json({ message: "Error in registering company", error });
    }
}



export const getCompany = async (req, res) => {
    try {
        const userId = req.userId;
        const company = await Company.find({ createdBy: userId });
        if (!company) {
            return res.status(400).json({ message: "No company found", success: false });
        }
        return res.status(200).json({ company });
    } catch (error) {
        console.log("error in getCompanies controller", error);
        res.status(400).json({ message: "Error in getting companies", error });
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("company id",id);
        const company = await Company.findById(id);
        if (!company) {
            return res.status(400).json({ message: "Company not found", success: false });
        }
        res.status(200).json({ company });
    } catch (error) {
        console.log("error in getCompanyById controller", error);
        res.status(400).json({ message: "Error in getting company", error });
    }
}

export const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        console.log("company id in update",companyId);
        const { name, description, location, website, linkedin, logo } = req.body;

        const file = req.file;
        console.log("file", logo);
        console.log(name, "update");

       

        
        const companyExists = await Company.findById(req.params.id);
        if (!companyExists) {
            return res.status(400).json({ message: "Company not exists", success: false });
        }
        if (companyExists.createdBy.toString() != req.userId.toString()) {
            console.log("companyExists.createdBy",companyExists.createdBy, "req.userId",req.userId);
            return res.status(400).json({ message: "You are not authorized to update this company", success: false });
        }

        const uploadRes = await Cloudinary.uploader.upload(logo);


        const updatedata = {
            companyname : name,
            description,
            location,
            website,
            linkedin,
            logo : uploadRes.secure_url

        }
        const company = await Company.findByIdAndUpdate(req.params.id, updatedata, { new: true });

        if (!company) {
            return res.status(400).json({ message: "Company not found", success: false });
        }

        return res.status(200).json({ message: "Company updated successfully", company: company });
    } catch (error) {
        console.log("error in updateCompany controller", error);
        res.status(400).json({ message: "Error in updating company", error });
    }
}