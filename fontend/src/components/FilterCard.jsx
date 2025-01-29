import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useJobStore } from "@/store/useJobStore";

const fiterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Mumbai", "Pune", "Kolkata", "Chennai"]
    },
    {
        filterType: "Experience",
        array: ["Fresher", "1 Year", "2 Years", "3 Years", "4 Years", "5 Years", "6 Years", "7 Years", "8 Years", "9 Years", "10 Years"]
    },
    {
        filterType: "Salary",
        array: ["10k-20k", "20k-30k", "30k-40k", "40k-50k", "50k-60k", "60k-70k", "70k-80k", "80k-90k", "90k-100k", "100k-110k", "110k-120k"]
    },
    {
        filterType: "Job Type",
        array: ["Full Time", "Part Time", "Internship"],
    },
    {
        filterType: "Job Role",
        array: ["Software Engineer", "Web Designer", "UI/UX Designer", "Data Scientist", "Product Manager", "Sales Manager", "Marketing Manager", "Account Manager", "HR Manager", "Finance Manager"],
    }

]
const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("")
    const {searchToQueryJob,searchQuery} =  useJobStore()

    const changeHandler = (value)=>{
        setSelectedValue(value)
    }

    useEffect (()=>{
        console.log(selectedValue);
        searchQuery(selectedValue)
    },[selectedValue])

    console.log("jobs search ",searchToQueryJob)

    return (
        <div className="w-full p-5 rounded-md shadow-lg bg-white border-gray-100">
            <h1 className="text-2xl font-bold my-2">Filter Jobs</h1>
            <hr className="mt-2 text-gray-700" />
            <RadioGroup onValueChange = {changeHandler} value = {selectedValue}>
                {
                    fiterData.map((item, index) => {
                        return (
                            <div key={index} className="flex flex-col my-2 gap-2 ">
                                <h1 className="text-lg font-bold">{item.filterType}</h1>
                                {
                                    item.array.map((item, idx) => {
                                        const itemId = `id${index} -${idx}`
                                        return (
                                            <div key={index} className="flex items-center gap-2 space-x-2 my-2">
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label htmlFor={itemId}>{item}</Label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </RadioGroup>
        </div>
    )
}


export default FilterCard;