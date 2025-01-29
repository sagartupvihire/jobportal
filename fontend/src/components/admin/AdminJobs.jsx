import AdminJobsTable from "./AdminJobsTable.jsx"

import { useEffect, useState } from "react"
import { Button } from "../ui/button.jsx"

import { Input } from "../ui/input.jsx"
import { useNavigate } from "react-router-dom"
import { useAdminJob } from "@/store/useAdminJob.js"

const AdminJobs = () => {
    const { AdminJobs, getAdminjobs } = useAdminJob()

    useEffect(() => {
        getAdminjobs()
    },[])

    const [filterJobs, setFilterJobs] = useState()

    
    const [input, setInput] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if (input) {
            setFilterJobs(AdminJobs.jobs.filter((job) => job.title?.toLowerCase()?.includes(input?.toLowerCase())))
        } else {
            setFilterJobs(AdminJobs.jobs)
        }
    }, [input,AdminJobs.jobs])
    
    return (
        <div>
            <div className="max-w-6xl mx-auto my-10 ">
                <div className="flex justify-between items-center">
                    <Input
                        placeholder="filter by name"
                        className="w-1/3 rounded"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    <Button className="flex items-center gap-2 rounded" onClick={() => { navigate("/admin/job/create") }}>New Jobs</Button>
                </div>

                <AdminJobsTable jobs={filterJobs} />
            </div>
        </div>
    )
}
export default AdminJobs