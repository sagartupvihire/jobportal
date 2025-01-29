import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { useJobStore } from "@/store/useJobStore"
import { useNavigate } from "react-router-dom"



const HeroSection = () => {
    const [query, setQuery] = useState()
    const {searchToQuery, searchQuery} = useJobStore()
    const navigate= useNavigate()

    const searchHandler = () => {
        console.log("hanfeler",query);
        searchQuery(query)
        navigate('/browse')
    }
    return (
        <div className="text-center ">
            <div className="flex flex-col gap-4  my-10">
                <span className="mx-auto px-4 py-2 bg-gray-100 text-red-500 font-medium rounded">No.1 Job Hunt Website</span>
                <h1 className="text-5xl font-bold my-2">Search , Apply & <br/> Get Your <span className="text-purple-600">Dream Jobs</span></h1>
                <p>Explore thousands of job opportunities with all the information you need. Its your future</p>

                <div className="flex w-[40%] shadow-lg border-gray-200 rounded-full items-center gap-4 mt-4 mx-auto pl-4 ">
                    <input className="w-full bg-transparent outline-none" value={query} onChange={(e)=>setQuery(e.target.value)} type="text" placeholder="find your dream Job"/>
                    <Button className="bg-purple-600  rounded-r-full" onClick ={ searchHandler}>
                        <Search className="h-5 w-5"/>
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default HeroSection