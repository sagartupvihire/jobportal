import Job from "../model/job.model.js";
import Company from "../model/company.model.js"
export const postJob = async (req, res) => {
    console.log("api calledd admin")

    try {
        const { title, company, location, description, salary, requirements, experience, skills, jobType, position } = req.body;

        console.log(title, company, location, description, salary, requirements, experience, skills, jobType, position)

        if (!title || !company || !location || !description || !salary || !requirements || !experience || !jobType || !position) {
            return res.status(400).json({ message: "All fields are required", data: req.body });
        }

        const existcompany = await Company.findById(company)


        if (!existcompany) {

            return res.status(400).json({ message: "Company not found", success: false });
        }

        if (existcompany.createdBy?.toString() != req.userId?.toString()) {
            console.log("existcompany.createdBy", existcompany.createdBy, "req.userId", req.userId);
            return res.status(400).json({ message: "You are not authorized to update this company", success: false });
        }


        const job = await Job.create({
            title,
            company,
            location,
            description,
            salary: Number(salary),
            requirements,
            experience,
            skills,
            jobType,
            position,
            createdBy: req.userId,
            createdAt: Date.now(),
        });

        res.status(200).json({ message: "Job posted successfully", job });
    } catch (error) {
        console.log("error in postJob controller", error);
        res.status(400).json({ message: "Error in posting job", error });
    }
};

export const getAllJobs = async (req, res) => {
    console.log("Received query parameters:", req.query);
    const keyword = req.query.keyword || "";
    console.log("keywords",req.query.keyword)
    try {

        // const Query = {
        //     $or: [
        //         { title: { $regex: keyword, $options: "i" } },
        //         {description: { $regex: keyword, $options: "i" } },

        // ]}
        const jobs = await Job.find({
            $or: [
                { title: { $regex: new RegExp(keyword, "i") } },
                { description: { $regex: new RegExp(keyword, "i") } },
                { location: { $regex: new RegExp(keyword, "i") } },
                { position: { $regex: new RegExp(keyword, "i") } },
                { jobType: { $regex: new RegExp(keyword, "i") } },
                { experience: { $regex: new RegExp(keyword, "i") } },
                { skills: { $regex: new RegExp(keyword, "i") } },
                { requirements: { $regex: new RegExp(keyword, "i") } },
               
               
                

            ]
        }).populate({ path: "company" }).sort({ createdAt: -1 });


        if (!jobs) {
            return res.status(400).json({ message: "No jobs found", success: false });
        }
        res.status(200).json({ jobs });
    } catch (error) {
        console.log("error in getAllJobs controller", error);
        res.status(400).json({ message: "Error in getting jobs", error });
    }
};

export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Job id not found", success: false });
        }
        const job = await Job.findById(id);
        if (!job) {
            return res.status(400).json({ message: "Job not found", success: false });
        }
        res.status(200).json({ job });
    } catch (error) {
        console.log("error in getJobById controller", error);
        res.status(400).json({ message: "Error in getting job", error });
    }
}


export const getAdminJob = async (req, res) => {
    try {
        const jobs = await Job.find({ createdBy: req.userId }).populate("company")
        if (!jobs) {
            return res.status(400).json({ message: "No jobs found", success: false });
        }
        res.status(200).json({ jobs });
    } catch (error) {
        console.log("error in getAdminJob controller", error);
        res.status(400).json({ message: "Error in getting jobs", error });
    }
}