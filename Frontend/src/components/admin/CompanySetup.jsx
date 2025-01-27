
import { Button } from "../ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCompanyStore } from "@/store/useCompanyStore"




const CompanySetup = () => {
    const param = useParams()
    
    useEffect(() => {
        getCompanyById(param.companyId)
       
    }, [])
    
   
    const { company,getCompanyById, isUpdating, updateCompany } = useCompanyStore()
    
    console.log("company", company);
    
    const [input, setInput] = useState({
        id: param.companyId,
        name: company?.companyname,
        description:company?.description || "",
        email: company?.email|| "",
        phonenumber:  company?.phonenumber|| "",
        logo: company?.logo|| '',
        location: company?.location|| "",
        website: company?.website|| "",
    })
    
    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            
            setInput({ ...input, [e.target.name]: base64Image });
        };
       
        
    }
        const navigate = useNavigate()

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }



    const updatecompany = (e) => {
        e.preventDefault()
        
        console.log("input ",input);
        updateCompany(input)

        navigate(`/admin/companies`)
    }

    useEffect(() => {
        setInput(
            {
                id: param.companyId,
                name: company?.companyname,
                description:company?.description || "",
                email: company?.email|| "",
                phonenumber:  company?.phonenumber|| "",
                logo: company?.logo|| '',
                location: company?.location|| "",
                website: company?.website|| "",
            }
        )
    },[company])

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
                    <form onSubmit={updatecompany} className="my-10 grid">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <Label className=" my-4 font-bold"> Company Name</Label>
                                <Input type="text" placeholder="Company Name"
                                    value={input.name}
                                    onChange={changeHandler}
                                    name="name"
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
                                    value={input?.email}
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
                                    
                                    onChange={handleFileChange}
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
                            isUpdating ? <Loader2 className="animate-spin w-4 h-4"></Loader2> : "Update Company"
                        }</Button>


                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup