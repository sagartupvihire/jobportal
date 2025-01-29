import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { useJobStore } from "@/store/useJobStore";
import { useState } from "react";

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Mobile Developer",
    "DevOps",
    "Data Scientist",
    "Data Engineer",
    "Data Analyst",
]
const CategorCarousel = () => {

    const [query, setQuery] = useState()    
    const {searchToQuery, searchQuery} = useJobStore()

    const navigate = useNavigate()

    const searchQHandler = (query) => {
        console.log("handler",query);
        searchQuery(query)
        navigate('/browse')
    }
    
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((item, index) => (
                            <CarouselItem key={index} className="md-basis-1/2 lg:basis-1/3 ">
                                <Button onClick={() => searchQHandler(item)} variant="outline" className="rounded-full">{item}</Button>
                            </CarouselItem>
                        ))
                    }
                    
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}

export default CategorCarousel;