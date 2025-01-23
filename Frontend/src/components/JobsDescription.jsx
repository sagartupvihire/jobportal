import { useJobStore } from "@/store/useJobStore";
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";


const JobsDescription = () => {


    const { getJobById, jobById, applyJob } = useJobStore()
    const { authUser } = useAuthStore()
    const JobId = useParams().id
    const isApply = jobById?.applicants?.includes(authUser?._id);


    console.log("JobId", jobById)
    console.log("isApply", isApply)
    console.log("authUser", authUser?._id)
    useEffect(() => {
        getJobById(JobId)
    }, [])

    if (!jobById) {
        return <div className="flex h-screen w-screen  items-center justify-center "><Loader className="animate-spin mb-11 size-10" /></div>
    }

    console.log("jobById", jobById)
    return (
        <div className="max-w-6xl mx-auto my-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-xl">{jobById?.title}</h1>
                    <div>
                        <Badge className={" text-blue-700 font-bold"} variant={'ghost'}> {jobById?.jobType}</Badge>
                        <Badge className={'text-red-600 font-bold'} variant={'ghost'}>{jobById?.salary}</Badge>
                        <Badge className={'text-indigo-600'} variant={'ghost'}>{jobById?.experience}</Badge>
                    </div>
                </div>
                <Button disabled={isApply} className={`rounded hover:opacity-80 ${isApply ? "bg-gray-950  cursor-not-allowed" : ""}`} onClick={() => applyJob(JobId)} >{isApply ? "Applied" : "Apply"} </Button>
            </div>

            <h1 className="border-b-2 font-medium py-4  border-b-gray-400"> {jobById?.company?.companyname}</h1>

            <div>
                <h1 className="font-bold my-1">Role: <span className="font-normal pl-4 text-gray-800"> {jobById?.position}</span></h1>
                <h1 className="font-bold my-1">Location: <span className="font-normal pl-4 text-gray-800"> {jobById?.location}</span></h1>
                <h1 className="font-bold my-1">Job Description: <span className="font-normal pl-4 text-gray-800"> {jobById?.description}</span></h1>
                <h1 className="font-bold my-1">Experience: <span className="font-normal pl-4 text-gray-800"> {jobById?.experience} years</span></h1>
                <h1 className="font-bold my-1">Salary: <span className="font-normal pl-4 text-gray-800"> {jobById?.salary}</span></h1>
                <h1 className="font-bold my-1">Total Applicants: <span className="font-normal pl-4 text-gray-800"> {jobById?.applicants.length}</span></h1>
                <h1 className="font-bold my-1">Posted Date: <span className="font-normal pl-4 text-gray-800">{new Date(jobById?.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</span></h1>

            </div>
        </div>
    )
}

export default JobsDescription