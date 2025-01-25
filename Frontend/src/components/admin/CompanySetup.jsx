import { Arrow } from "@radix-ui/react-popover"
import { Button } from "../ui/button"
import { ArrowLeft } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useState } from "react"


const CompanySetup = () => {
    const [input, setInput] = useState({
        name: "",
        description: "",
        email: "",
        phonenumber: "",
        logo: null,
        location: "",
        website: "",
    })

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <div className="max-w-xl mx-auto my-10">
                <form>
                    <div className="flex items-center justify-between gap-5 p-8">
                        <Button variant="outline" className="rounded-full flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className="text-2xl font-bold">Company Setup</h1>
                    </div>
                    <Label> Company Name</Label>
                    <Input type="text" placeholder="Company Name"
                    value={input.name}
                    onChange={changeHandler}
                    name="name"
                    />
                    <Label> Company Description</Label>
                    <Input type="text" placeholder="Company Description"
                    value={input.description}
                    onChange={changeHandler}
                    name="description"
                    />
                    <Label> Company Email</Label>
                    <Input type="text" placeholder="Company Email"
                    value={input.email}
                    onChange={changeHandler}
                    name="email"
                    />
                    <Label> Company Phone Number</Label>
                    <Input type="text" placeholder="Company Phone Number"
                    value={input.phonenumber}
                    onChange={changeHandler}
                    name="phonenumber"
                    />
                </form>
            </div>
        </div>
    )
}

export default CompanySetup