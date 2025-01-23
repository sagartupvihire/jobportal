import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title : {type : String, required : true},
    
    location : {type : String, required : true},
    description : {type : String, required : true},
    salary : {type : String, required : true},
    requirements : {type : String, required : true},
    experience : {type : String, required : true},
    skills : [{type : String, required : true}],
    jobType : {type : String, required : true},
    position : {type : String, required : true},
    company : {type : mongoose.Schema.Types.ObjectId, ref : "Company", required : true}, 
    createdBy : {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true},
    applicants : [{type : mongoose.Schema.Types.ObjectId, ref : "Application"}],  
},{timestamps : true});

const Job = mongoose.model("Job", jobSchema);

export default Job