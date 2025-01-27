import Application from "../model/application.model.js";
import Job from "../model/job.model.js";

export const getAppliedJobs = async (req, res) => {
    try {
        
        const applications = await Application.find({ applicant: req.userId }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: { path: "company", sort: { createdAt: -1 } },
        });

        if (!applications) {
            return res.status(400).json({ message: "No applications found", success: false });
        }
        res.status(200).json({ applications });
    } catch (error) {
        console.log("error in getApplications controller", error);
        res.status(400).json({ message: "Error in getting applications", error });
    }
}   

export const getApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await Application.findById(id);
        if (!application) {
            return res.status(400).json({ message: "Application not found", success: false });
        }
        res.status(200).json({ application });
    } catch (error) {
        console.log("error in getApplicationById controller", error);
        res.status(400).json({ message: "Error in getting application", error });
    }
}

export const applyForJob = async (req, res) => {
    try {
        const userId = req.userId;
        const jobId = req.params.id;

        console.log("userId by apply job", userId);
        console.log("jobId by apply job", jobId);
        if(!jobId || !userId) {
            return res.status(400).json({ message: "Job id or user id not found", success: false });
        }
        
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({ message: "Job not found", success: false });
        }
        
        
        const existApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existApplication) {
            return res.status(400).json({ message: "You have already applied for this job", success: false });
        }
        
        
        const application = await Application.create({ job: jobId, applicant: userId, status: "pending" });
        if (!application) {
            
            return res.status(400).json({ message: "Application not found", success: false });
        }

        job.applications.push(application._id);

        
        
        await job.save();


        return res.status(201).json({message: "Application created successfully", success: true});
    } catch (error) {
        console.log("error in applyForJob controller", error);
        res.status(400).json({ message: "Error in applying for job", error });
    }
}

export const getApplicants = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate :{
                path: "applicant",
                options: { sort: { createdAt: -1 } },
            }
        })
        
        console.log("job", job);
        if (!job) {
            return res.status(400).json({ message: "Job not found", success: false });
        }
        
        res.status(200).json({ job: job });

        
    } catch (error) {
        console.log("error in getApplicants controller", error);
        res.status(400).json({ message: "Error in getting applications", error });
    }
}


export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        console.log(status);
        
        if( !status) {
            return res.status(400).json({ message: "Status not found", success: false });
        }

        const application = await Application.findOne({ _id: id });
        if (!application) {
            return res.status(400).json({ message: "Application not found", success: false });
        }
        application.status = status;
        await application.save();

        res.status(200).json({ application });
    } catch (error) {
        console.log("error in updateStatus controller", error); 
        res.status(400).json({ message: "Error in updating status", error });
    }   
}