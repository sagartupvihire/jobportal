import express from "express";
const router = express.Router();

import { applyForJob, getApplicants, getApplicationById, getAppliedJobs, updateStatus } from "../controller/application.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js"; 
import { get } from "mongoose";

router.post("/apply/:id", isAuthenticated, applyForJob);
router.put("/status/:id/update", isAuthenticated, updateStatus);
router.get("/getapplicants/:id", isAuthenticated, getApplicants);
router.get("/getapplication/:id", isAuthenticated, getApplicationById);
router.get("/getappliedjobs", isAuthenticated, getAppliedJobs);



export default router