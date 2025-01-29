/* eslint-disable react/prop-types */
import { Bookmark } from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { useNavigate } from "react-router-dom"



const Job = ({ jobData }) => {
    const navigate = useNavigate()
    
    
    
    const dayAgo = (mongoDbTime) => {
        const createAt =  new Date(mongoDbTime);
        const CurrentTime = new Date();

        const timeDiff = CurrentTime.getTime() - createAt.getTime();
        const dayDiff = timeDiff / (1000 * 3600 * 24);

        if (dayDiff < 1) {
            return "Today";
        } else if (dayDiff < 2) {
            return "Yesterday";
        } else {
            return Math.floor(dayDiff) + " days ago";
        }
    }

    return (
        <div className="p-5 sm:w-full rounded-md shadow-lg bg-white hover:scale-105 transition-transform duration-200 hover:shadow-2xl border-gray-100 cursor-pointer ">
            <div className="flex justify-between items-center">

                <p className="text-sm text-gray-600">
                    {dayAgo(jobData?.createdAt)}
                </p>

                <Button variant="outline" className="rounded-full my-2" size="icon"><Bookmark /></Button>
            </div>
            <div className="flex gap-4 items-center my-2 ">
                <Button className="p-6 " variant="outline" size="icon">
                    <Avatar >
                        <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                </Button>

                <div>
                    <h1>{jobData?.company.companyname}</h1>
                    <p>{jobData?.location}</p>
                </div>
            </div>

            <div className="">
                <h1 className="font-bold text-lg my-2">{jobData?.title}</h1>
                <p className="text-sm text-gray-600">{jobData?.description}</p>
            </div>
            <div className="flex gap-2 items-center mt-4">
                <Badge className={"text-blue-700 font-bold"} variant="ghost">{jobData?.experience} Years</Badge>
                <Badge className={"text-red-700 font-bold"} variant="ghost">{jobData?.jobType}</Badge>
                <Badge className={"text-purple-700 font-bold"} variant="ghost">{jobData?.salary}</Badge>

            </div>

            <div className=" flex  items-center gap-4 mt-3">
                <Button variant="outline" className="my-4 w-full rounded" onClick={() => navigate(`/description/${jobData?._id}`)} >Details</Button>
                <Button variant="outline" className="bg-purple-600 rounded sm:w-full my-4">Save for later</Button>

            </div>
        </div>
    )
}

export default Job