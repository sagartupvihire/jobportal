/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import LatestJobsCard from "./LatestJobCard"
import { useJobStore } from "@/store/useJobStore"
const randomJob = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

const LatestJobs = () => {

    const { job, getJob } = useJobStore()

    useEffect(() => {
        getJob()

    }, [])

    
    return (
        <div className="max-w-6xl mx-auto my-20 ">
            <h1 className="text-4xl font-bold my-2"><span className="text-purple-600">Latest & Top </span> Jobs Opening</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                {
                    job?.slice(0, 9).map((job) =>
                        <LatestJobsCard key={job._id} job={job} />
                    )
                }
            </div>

        </div>

    )
}

export default LatestJobs