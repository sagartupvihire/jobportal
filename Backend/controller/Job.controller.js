import Job from "../model/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, company, location, description, salary, requirements, experience, skills, jobType, position } = req.body;
        
        if (!title || !company || !location || !description || !salary || !requirements || !experience || !skills || !jobType || !position) {
            return res.status(400).json({ message: "All fields are required" ,data : req.body});
        }
        const job = await Job.create({
            title,
            company,
            location,
            description,
            salary : Number(salary),
            requirements,
            experience,
            skills,
            jobType,
            position,
            createdBy: req.userId,
            createdAt: Date.now(),
        });

        res.status(200).json({message: "Job posted successfully", job});
    } catch (error) {
        console.log("error in postJob controller", error);
        res.status(400).json({ message: "Error in posting job", error });
    }
};

export const getAllJobs = async (req, res) => {
    const keyword = req.query.keyword || "";
    try {

        // const Query = {
        //     $or: [
        //         { title: { $regex: keyword, $options: "i" } },
        //         {description: { $regex: keyword, $options: "i" } },

        // ]}
        const jobs = await Job.find({$or: [
                { title: { $regex: new RegExp(keyword, "i") } },
                { description: { $regex: new RegExp(keyword, "i") } }
            ]}).populate({path : "company"}).sort({ createdAt: -1 });

            
        if (!jobs) {
            return res.status(400).json({ message:  "No jobs found", success: false });
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
        const jobs = await Job.find({ createdBy: req.userId });
        if (!jobs) {
            return res.status(400).json({ message: "No jobs found", success: false });
        }
        res.status(200).json({ jobs });
    } catch (error) {
        console.log("error in getAdminJob controller", error);
        res.status(400).json({ message: "Error in getting jobs", error });
    }
}