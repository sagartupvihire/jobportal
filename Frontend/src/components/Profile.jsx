import { Camera, Contact, Loader2, Mail, Pen, Plus } from "lucide-react"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Label } from "@radix-ui/react-label"
import ApliedJobsTable from "./ApliedJobsTable"
import { useEffect, useState } from "react"
import UpdateProfile from "./UpdateProfile.jsx"

import { useAuthStore } from "../store/useAuthStore"
import toast from "react-hot-toast"
import { Input } from "./ui/input"




const Profile = () => {
    const isResume = true
    const [open, setOpen] = useState(false)

    const { authUser, isUpdatingProfile, checkAuth, updateProfilePic, updateProfile, updateResume, isResumeUploading } = useAuthStore()

    const skills = authUser.profile?.skills || [];

    useEffect(() => {
        checkAuth()
    }, [isUpdatingProfile])

    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfilePic({ profilePic: base64Image });
        };
    };

    const [inputSkillsValue, setInputSkillsValue] = useState("");

    const [isSkillsInputOpen, setIsSkillsInputOpen] = useState(false);

    const addSkills = async (e) => {
        e.preventDefault();
        console.log("inputSkillsValue", inputSkillsValue);

        if (inputSkillsValue) {
            try {

                const res = await updateProfile({ skills: inputSkillsValue, authUserId: authUser._id });
                console.log(res);
                toast.success("Skills added successfully");
                setInputSkillsValue("");
            }
            catch (error) {
                console.log("error in addSkills", error);
            }
        }
        setIsSkillsInputOpen(false);
    };

    const [resume, setResume] = useState(null);

    const uploadResume = async (e) => {
        e.preventDefault();
        console.log("resume", resume);
        console.log("uploading resume");
        // const reader = new FileReader();

        // reader.readAsDataURL(resume);
        // reader.onload = async () => {
        //     const base64Image = reader.result;
        //     setSelectedImg(base64Image);
        await updateResume(resume);
    };


    return (
        <div>

            <div className="max-w-5xl  mx-auto bg-white border border-gray-500 rounded-2xl p-5 my-5">

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        {/* <Avatar  className="w-24 h-24 mx-6  ">
                            <AvatarImage src="https://github.com/shadcn.png" />
                        </Avatar>
                        
                        <input type="file" onChange={(e) => updateProfilePic(e.target.files[0])} /> */}

                        <div className="flex flex-col items-center gap-2">
                            <div className="relative mx-6 rounded-full">
                                <img
                                    src={selectedImg || authUser.profilepic || "https://github.com/shadcn.png"}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-4 "
                                />
                                <label
                                    htmlFor="avatar-upload"
                                    className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
                                >
                                    <Camera className="w-7 h-7 border-transparent bg-white rounded-full p-1" />
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={isUpdatingProfile}
                                    />
                                </label>
                            </div>

                        </div>

                        <div>
                            <h1 className="font-medium text-xl">{authUser.name}</h1>
                            <p> {authUser.bio} </p>
                        </div>

                    </div>
                    <Button className="text-right rounded" variant="outline" onClick={() => setOpen(true)} ><Pen /></Button>

                </div>

                <div className="flex flex-col gap-3 mt-5">
                    <div className="flex gap-2 items-center ">
                        <Mail />
                        <spam>{authUser.email}</spam>
                    </div>

                    <div className="flex gap-2 items-center">
                        <Contact />
                        <span>{authUser.phonenumber}</span>
                    </div>
                </div>

                <div className="mt-5" >
                    <h1 className="font-medium text-xl">Skills</h1>
                    <div className="flex items-center  flex-wrap gap-2 mt-3">
                        {
                            skills.length > 0 ? skills.map((item, index) => (<Badge key={index} className={"border border-gray-500 h-8 text-center  "}  >{item} </Badge>)) : <h1>No Skills Found</h1>
                        }
                        {
                            isSkillsInputOpen ?
                                <form onSubmit={addSkills}><input placeholder="Add Skills" type="text" className="border text-center w-36 border-gray-500 rounded-xl p-1" value={inputSkillsValue} onChange={(e) => setInputSkillsValue(e.target.value)} /> <Button className="text-white font-bold border border-gray-500 rounded w-16 p-1" type="submit" >Add</Button> </form> : <Plus className="my-3 cursor-pointer" onClick={() => setIsSkillsInputOpen(true)} />
                        }
                    </div>

                </div>

                <div className="mt-5 flex w-full max-w-sm items-center gap-3 flex-row   ">
                    <Label className="font-medium text-xl">Resume</Label>

                    {isResume ? (
                        <a className="text-blue-600 hover:underline" href={authUser.profile?.resume} target="_blank" download>
                            Download Resume
                        </a>
                    ) : (
                        <span>No Resume Found</span>
                    )}

                    <form onSubmit={uploadResume} className="mt-2">
                        <Input
                            type="file"
                            accept=".pdf"
                            name="resume"
                            id="resume"
                            className="w-full"
                            onChange={e => setResume(e.target?.files?.[0] || null)}
                        />
                        <Button type="submit" className="mt-2 w-full">
                            {isResumeUploading ? <Loader2 className="animate-spin" /> : "Upload Resume"}
                        </Button>
                    </form>
                </div>

            </div>

            <div className="max-w-4xl  mx-auto bg-white border border-gray-500 rounded-2xl p-5 my-5">
                <h1 className="font-bold text-lg my-5 ">Applied Jobs</h1>

                <ApliedJobsTable />

            </div>

            <UpdateProfile open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile