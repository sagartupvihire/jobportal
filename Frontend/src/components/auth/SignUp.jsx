import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, } from "../ui/radio-group";
import { useState } from "react";


import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore"
import { Loader } from "lucide-react";


const Login = () => {

    const { isSigningUp, signUp } = useAuthStore()



    
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
        name: "",
        phonenumber: "",
        profile: null
    });

    const changeEventHandler = (e) => {
        if (e.target.type === "file") {
            setInput({ ...input, profile: e.target.files[0] });
        } else {
            setInput({ ...input, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();
            Object.keys(input).forEach(key => {
                formData.append(key, input[key]);
            });

            const res = await signUp(formData);
            console.log(res);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>

            <div className=" flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={handleSubmit} className="w-1/2  border border-gray-200 rounded-md p-4 my-10">
                    <h1 className="text-xl mb-5 font-bold">Signup</h1>

                    <div>
                        <Label htmlFor="name" className="text-md">Name</Label>
                        <Input className="text-md rounded my-2 border border-gray-200" placeholder="Enter your name" type="text" name="name" id="name" onChange={changeEventHandler} />
                    </div>
                    <div>

                        <Label htmlFor="email" className="text-md">Email</Label>
                        <Input className="text-md rounded my-2 border border-gray-200" placeholder="Enter your email" type="email" name="email" id="email" onChange={changeEventHandler} />
                    </div>

                    <div className="mt-5">
                        <Label htmlFor="password" className="text-md">Password</Label>
                        <Input className="text-md rounded my-2 border border-gray-200" placeholder="Enter your password" type="password" name="password" id="password" onChange={changeEventHandler} />
                    </div>

                    <div className="mt-5">
                        <Label htmlFor="phonenumber" className="text-md">Phone Number</Label>
                        <Input className="text-md rounded my-2 border border-gray-200" placeholder="Enter your phone number" type="number" name="phonenumber" id="phonenumber" onChange={changeEventHandler} />
                    </div>


                    <div className="mt-5 flex items-center justify-between">
                        <RadioGroup className="flex  items-center gap-4 my-5" >
                            <div className="flex items-center space-x-2 ">
                                <Input type="radio" name="role" id="r1" className="text-md" value="student" checked={input.role === "student"} onChange={changeEventHandler} />
                                <Label htmlFor="r1">Student</Label>
                            </div>

                            <div className="flex items-center space-x-2 ">
                                <Input type="radio" name="role" id="r2" className="text-md" value="recruiter" checked={input.role === "recruiter"} onChange={changeEventHandler} />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>

                        </RadioGroup>

                        

                    </div>
                    {
                        isSigningUp ? (
                            <Button type="submit" className="mt-5 w-full rounded" disabled><Loader className="animate-spin" /></Button>
                        ) :
                            <Button type="submit" className="mt-5 w-full rounded">Signup</Button>
                    }
                    <p className="text-sm text-gray-500 mt-5">Already have an account? <Link className="text-blue-500" to="/login">Login</Link></p>

                </form>
            </div>
        </div>
    )
}

export default Login;