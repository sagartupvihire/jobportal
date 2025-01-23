import { useJobStore } from "@/store/useJobStore"
import Job from "./Job"
import {  useEffect } from "react"

const randomJob = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 27, 28, 29, 30]

const Browse = () => {
    const { job , getJob} = useJobStore()

    useEffect(() => {
        getJob()

    }, [getJob])

    return (
        <div >
            <div className="max-w-6xl mx-auto my-10 ">
                <h1 className="text-4xl font-bold my-10" >Search Result({randomJob.length})</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        job?.map((jobItem, index) => {
                            return (
                                <Job key={index} jobData={jobItem} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse