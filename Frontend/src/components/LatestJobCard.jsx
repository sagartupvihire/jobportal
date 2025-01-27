import { Badge } from "./ui/badge"

const 
latestJobCard = ({job}) => {
    return (
        <div className="p-5 rounded-md hover:shadow-2xl shadow-lg hover:scale-105 transition-transform duration-200 bg-white border-gray-400 cursor-pointer">
            <div>
                <h1 className="font-medium text-lg">{job.company.companyname}</h1>
                <p className="text-sm text-gray-500">{job.location}</p>
            </div>

            <div>
                <h1 className="font-bold text-lg my-2">{job.title}</h1>
                <p className="text-sm text-gray-600">{job.position}</p>
            </div>

            <div className="flex gap-2 items-center mt-4">
                <Badge className={"text-blue-700 font-bold"} variant="ghost">{job.experience} Years</Badge>
                <Badge className={"text-red-700 font-bold"} variant="ghost">{job.jobType}</Badge>
                <Badge className={"text-purple-700 font-bold"} variant="ghost">{job.salary}</Badge>

            </div>
            
        </div>
    )
}

export default latestJobCard