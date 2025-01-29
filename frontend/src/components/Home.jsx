import HeroSection from "./HeroSection"
import CategorCarousel from "./CategorCarousel.jsx"
import LatestJobs from "./LatestJobs.jsx"
import Footer from "./Footer"
import { useJobStore } from "@/store/useJobStore"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"

const Home = () => {

    const {getJob} = useJobStore()
    const {authUser} = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        getJob()
        if(authUser?.role === "recruiter") navigate("/admin/companies")
    }, [getJob])

    return (
        <div>
            <HeroSection/>
            <CategorCarousel/>
            <LatestJobs/>
            <Footer/>
        </div>
    )
}

export default Home