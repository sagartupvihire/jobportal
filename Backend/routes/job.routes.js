import express from "express"
const router = express.Router();

import { getAdminJob, getAllJobs, getJobById, postJob } from "../controller/Job.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
router.post("/postjob", isAuthenticated, postJob);
router.get("/getjob", isAuthenticated, getAllJobs);
router.get("/getjob/:id", isAuthenticated, getJobById);
router.get("/getadminjob", isAuthenticated, getAdminJob);

export default router