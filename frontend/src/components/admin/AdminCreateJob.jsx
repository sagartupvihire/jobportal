import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { useAdminJob } from "@/store/useAdminJob"
import { useNavigate } from "react-router-dom"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

import { useCompanyStore } from "@/store/useCompanyStore"

const AdminCreateJob = () => {
    const navigate = useNavigate()
    const { getCompany, getAllCompanies } = useCompanyStore()

    const { postJob, isPostingJob } = useAdminJob()
    const [input, setInput] = useState({
        title: "",
        position: "",
        salary: "",
        requirements: "",
        location: "",
        jobType: "",
        experience: '',
        description: '',
        company: '',
    })
    const createJob = (e) => {

        e.preventDefault()
        console.log("asagr",input);
        postJob(input)
        navigate('/admin/jobs')
    }

    useEffect(() => {
        getCompany()
    }, [getCompany])

    
    const changeHandler = (e) => {

        setInput({ ...input, [e.target.name]: e.target.value })
        console.log("asagr",input);
    }
    return (
        <div className="max-w-4xl mx-auto">

            <div className="max-w-4xl mx-auto ">
                <div className="my-10">
                    <h1 className="font-bold text-2xl">
                        Your Companies Name
                    </h1>
                    <p className="text-gray-500">What would you like to be called your company name? You can change later</p>
                </div>
                <div>
                    <div className="flex items-center justify-between gap-5 p-8">
                        <Button variant="outline" className="rounded-full flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className="text-2xl font-bold">Post Job</h1>
                    </div>
                    <form onSubmit={createJob} className="my-10 grid">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <Label className=" my-4 font-bold">Job Title</Label>
                                <Input type="text" placeholder="Company Name"
                                    value={input.title}
                                    onChange={changeHandler}
                                    name="title"
                                    className="my-4 rounded focus-visible:ring-offset-0"
                                />
                            </div>
                            <div>
                                <Label className=" my-4 font-bold">Description</Label>
                                <Input type="text" placeholder="Job Description"
                                    value={input.description}
                                    onChange={changeHandler}
                                    name="description"
                                    className="my-4 rounded"
                                />
                            </div>
                            <div>
                                <Label className=" my-4 font-bold">Location</Label>
                                <Input type="text" placeholder="Location"
                                    value={input.location}
                                    onChange={changeHandler}
                                    name="location"
                                    className="my-4 rounded"
                                />

                            </div>
                            <div>
                                <Label className=" my-4 font-bold"> Requirements</Label>
                                <Input type="text" placeholder="recuirment"
                                    value={input.requirements}
                                    onChange={changeHandler}
                                    name="requirements"
                                    className="my-4 rounded"
                                />
                            </div>

                            <div className="my-9 ">
                                <Select className="" onValueChange={(value) => setInput({ ...input, company: value })} defaultValue={input.company}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Select Company</SelectLabel>
                                            {
                                                getAllCompanies?.map((item) => (
                                                    <SelectItem key={item._id} value={item._id}>{item.companyname}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className=" my-4 font-bold"> Salary</Label>
                                <Input type="text" placeholder="Company Logo"
                                    value={input.salary}
                                    onChange={changeHandler}
                                    name="salary"
                                    className="my-4 rounded"
                                />
                            </div>
                            <div>
                                <Label className=" my-4 font-bold"> Job Type</Label>
                                <Input type="text" placeholder="Company Location"
                                    value={input.jobType}
                                    onChange={changeHandler}
                                    name="jobType"
                                    className="my-4 rounded"
                                />
                            </div>
                            <div>
                                <Label className=" my-4 font-bold"> Experience</Label>
                                <Input type="text" placeholder="Company Website"
                                    value={input.experience}
                                    onChange={changeHandler}
                                    name="experience"
                                    className="my-4 rounded"
                                />
                            </div>
                            <div>
                                <Label className=" my-4 font-bold">Position</Label>
                                <Input type="text" placeholder="Company Website"
                                    value={input.position}
                                    onChange={changeHandler}
                                    name="position"
                                    className="my-4 rounded"
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-4 rounded-xl ">{
                            isPostingJob ? <Loader2 className="animate-spin w-4 h-4"></Loader2> : "Post Job"
                        }</Button>


                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminCreateJob