/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useCompanyStore } from "@/store/useCompanyStore"
import { Label } from "../ui/label"

const CompaniesCreate = () => {
    const {company, registerCompany, isRegisteringCompany } = useCompanyStore()
    const navigate = useNavigate()

    const [companyName, setCompanyName] = useState("")
    const [input, setInput] = useState({
        companyname: "",
        description: "",
        email: "",
        phonenumber: "",
        logo: '',
        location: "",
        website: "",
    })

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    console.log("company",company);
    
    const registerNewCompany = (e) => {
        e.preventDefault()
         registerCompany(input)
        console.log(company);
        
        navigate(`/admin/companies`)

    }


    return (
        <div>

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
                        <h1 className="text-2xl font-bold">Company Setup</h1>
                    </div>
                    <form onSubmit={registerNewCompany} className="my-10 grid">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <Label className=" my-4 font-bold"> Company Name</Label>
                                <Input type="text" placeholder="Company Name"
                                    value={input.companyname}
                                    onChange={changeHandler}
                                    name="companyname"
                                    className="my-4 rounded"
                                />
                            </div>
                            <div>
                                <Label className=" my-4 font-bold"> Company Description</Label>
                                <Input type="text" placeholder="Company Description"
                                    value={input.description}
                                    onChange={changeHandler}
                                    name="description"
                                    className="my-4 rounded"
                                />
                            </div>
                            <div>
                                <Label className=" my-4 font-bold"> Company Email</Label>
                                <Input type="text" placeholder="Company Email"
                                    value={input.email}
                                    onChange={changeHandler}
                                    name="email"
                                    className="my-4 rounded"
                                />

                            </div>
                            <div>
                                <Label className=" my-4 font-bold"> Company Phone Number</Label>
                                <Input type="text" placeholder="Company Phone Number"
                                    value={input.phonenumber}
                                    onChange={changeHandler}
                                    name="phonenumber"
                                    className="my-4 rounded"
                                />
                            </div>
                            <div>
                                <Label className=" my-4 font-bold"> Company Logo</Label>
                                <Input type="file" placeholder="Company Logo"
                                    value={input.logo}
                                    onChange={changeHandler}
                                    name="logo"
                                    className="my-4 rounded"
                                />
                            </div>
                            <div>
                                <Label className=" my-4 font-bold"> Company Location</Label>
                                <Input type="text" placeholder="Company Location"
                                    value={input.location}
                                    onChange={changeHandler}
                                    name="location"
                                    className="my-4 rounded"
                                />
                            </div>
                            <div>
                                <Label className=" my-4 font-bold"> Company Website</Label>
                                <Input type="text" placeholder="Company Website"
                                    value={input.website}
                                    onChange={changeHandler}
                                    name="website"
                                    className="my-4 rounded"
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-4 rounded-xl ">{
                            isRegisteringCompany ? <Loader2 className="animate-spin w-4 h-4"></Loader2> : "Create Company"
                        }</Button>


                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompaniesCreate