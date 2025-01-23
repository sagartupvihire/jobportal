import express from "express"
import { checkAuth, login, logout, register } from "../controller/auth.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();

router.post("/register", singleUpload, register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/checkauth", isAuthenticated, checkAuth);

export default router