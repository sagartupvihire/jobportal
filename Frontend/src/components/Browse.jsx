import { useJobStore } from "@/store/useJobStore"
import Job from "./Job"
import {  useEffect } from "react"


const Browse = () => {
    const { searchToQueryJob , getJob} = useJobStore()

    useEffect(() => {
        getJob()

    }, [getJob, searchToQueryJob])

    return (
        <div >
            <div className="max-w-6xl mx-auto my-10 ">
                <h1 className="text-4xl font-bold my-10" >Search Result({searchToQueryJob?.length})</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        searchToQueryJob?.map((jobItem, index) => {
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