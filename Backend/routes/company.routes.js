import express from "express";
const router = express.Router();

import { registerCompany, getCompanyById, updateCompany, getCompany } from "../controller/company.controller.js";   
import { isAuthenticated } from "../middleware/isAuthenticated.js"; 

router.post("/register", isAuthenticated, registerCompany);
router.get("/getcompany", isAuthenticated, getCompany);
router.get("/:id", isAuthenticated, getCompanyById);
router.put("/update/:id", isAuthenticated, updateCompany);

export default router;