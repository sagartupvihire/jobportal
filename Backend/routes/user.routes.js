import express from "express"
const router = express.Router();

import { updateProfile, updateProfilePic, uploadResume } from "../controller/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import upload from "../middleware/upload.js";

router.post("/updateprofile", isAuthenticated, updateProfile);
router.post("/updateprofilepic", isAuthenticated, updateProfilePic);
router.post("/uploadresume", isAuthenticated, upload.single('resume'), uploadResume);
export default router