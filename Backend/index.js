import express, { application } from "express";
import dotenv from "dotenv";


import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const corsOption = {
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    preflightContinue: true
}

app.use(cors(corsOption));
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectDb from "./lib/connectDb.js";
import companyRoutes from "./routes/company.routes.js";
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";
app.use("/v1/api/auth", authRoutes);
app.use("/v1/api/user", userRoutes);
app.use("/v1/api/company", companyRoutes);
app.use("/v1/api/job", jobRoutes);
app.use("/v1/api/application", applicationRoutes);
dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb();
});