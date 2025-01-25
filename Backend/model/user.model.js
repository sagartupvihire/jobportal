import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    phonenumber : {type : String, required : true},
    profilepic : {type : String, default : ""},
    avatar : {type : String, default : ""},
    role : {type : String, enum :["student", "recruiter"], required : true},
    profile :{
        bio:{type : String, default : ""},
        location:{type : String, default : ""},
        website:{type : String, default : ""},
        linkedin:{type : String, default : ""},
        skills : [{type : String, default : ""}],
        resume:{type : String, default : ""},
        resumeOriginName : {type : String, default : ""},
        company:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company"
        },
        profilePhoto : {type : String, default : ""},
    }
},{timestamps : true});

const User = mongoose.model("User", userSchema);

export default User