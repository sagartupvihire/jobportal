/* eslint-disable no-unused-vars */

import { useApplicationStore } from "@/store/useApplicationStore";
import { ApplicantTable } from "./ApplicantTable";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Applicants = () => {

    const params = useParams()

    console.log(params)

    const {getApplicants, application} = useApplicationStore()

    useEffect(() => {
        
        getApplicants(params.jobId)
    }, [ getApplicants ,params.jobId])

    useEffect(() => {
        console.log("application fetched", application.job?.applications)
    }, [application])
    return (
        <div>
            <div className="max-w-6xl mx-auto ">
                <h1 className="text-xl font-bold my-5">Applicants ({application.job?.applications?.length})</h1>

                <ApplicantTable applications={application.job?.applications} />
            </div>
        </div>
        
    )
}


export default Applicants;