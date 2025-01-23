import HeroSection from "./HeroSection"
import CategorCarousel from "./CategorCarousel.jsx"
import LatestJobs from "./LatestJobs.jsx"
import Footer from "./Footer"

const Home = () => {
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