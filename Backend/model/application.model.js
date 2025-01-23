import mongoose from "mongoose";

const application = new mongoose.Schema({
    job : {type : mongoose.Schema.Types.ObjectId, ref : "Job", required : true},
    applicant : {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true},
    status : {type : String, enum : ["pending", "accepted", "rejected"], default : "pending"},
    createdAt : {type : Date, default : Date.now},
    updatedAt : {type : Date, default : Date.now},
},{timestamps : true});

const Application = mongoose.model("Application", application);

export default Application;