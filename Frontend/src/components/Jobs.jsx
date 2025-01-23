/* eslint-disable react/jsx-key */
import { useEffect } from "react"
import { useJobStore } from "../store/useJobStore"
import FilterCard from "./FilterCard"
import Job from "./Job"

import { Loader } from "lucide-react"





const Jobs = () => {

    const { job, getJob } = useJobStore()

    useEffect(() => {
        getJob()

    }, [getJob])

    
    
    if(!job){
        return <div><Loader/></div>
    }

    return (
        <div >
            <div className="max-w-6xl mx-auto m-5 ">

                <div className="flex gap-6 ">

                    <div className="hidden lg:block">
                        <FilterCard />
                    </div>


                    {
                        job.length <= 0 ? <h1 className="text-2xl font-bold my-2">No Jobs Found</h1> : (

                            <div className=" flex-1 h-[88vh] overflow-y-auto pb-5">

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
                                    {
                                        job?.map((jobItem, index) => (
                                            <div key={index}>
                                                <Job jobData={jobItem} />
                                            </div>
                                        ))
                                    }
                                </div>

                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs