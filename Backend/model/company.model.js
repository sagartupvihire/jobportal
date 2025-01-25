import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyname : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    description : {type : String, required : true},
    location : {type : String, required : true},
    website : {type : String, required : true},
   
    logo : {type : mongoose.Schema.Types.ObjectId, ref : "User", },
    createdBy : {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true}, 
},{timestamps : true});

const Company = mongoose.model("Company", companySchema);

export default Company