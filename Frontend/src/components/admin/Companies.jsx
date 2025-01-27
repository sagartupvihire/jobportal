import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import CompaniesTable from "./CompaniesTable.jsx"
import { useEffect, useState } from "react"
import { useCompanyStore } from "@/store/useCompanyStore"





const Companies = () => {
    const navigate = useNavigate()

    const {getCompany , getAllCompanies} = useCompanyStore()
    const [input, setInput] = useState()
    const [filtercompanies, setfiltercompanies] = useState(getAllCompanies) 

    useEffect(() => {
        getCompany()
        setfiltercompanies(getAllCompanies)
    }, [getCompany,])

    useEffect(() => {
        if (input) {
            setfiltercompanies(getAllCompanies.filter((company) => company.companyname?.toLowerCase()?.includes(input?.toLowerCase())))
        } else {
            setfiltercompanies(getAllCompanies)
        }
    }, [input, getAllCompanies])

 

    return (
        <div>
            <div className="max-w-6xl mx-auto my-10 ">
                <div className="flex justify-between items-center">
                    <Input
                        placeholder="filter by name"
                        className="w-fit rounded"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    <Button className="flex items-center gap-2 rounded" onClick={() => { navigate("/admin/companies/create") }}>New Company</Button>
                </div>

                <CompaniesTable className="mt-10 w-full" Companies={filtercompanies}  />
            </div>
        </div>
    )
}

export default Companies