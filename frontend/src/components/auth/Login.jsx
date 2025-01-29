/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useEffect, useState } from "react";


import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader } from "lucide-react";


const Login = () => {

    const {  isLoggingIn, login } = useAuthStore()
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });

    

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        try {

            e.preventDefault();
            
            const res = login(input);
            console.log(res);
            toast.success(res.data.message || "Login successful");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>

            <div className=" flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={handleSubmit} className="w-1/2  border border-gray-200 rounded-md p-4 my-10">
                    <h1 className="text-xl mb-5 font-bold">Login</h1>
                    <div>

                        <Label htmlFor="email" className="text-md">Email</Label>
                        <Input placeholder="Enter your email" type="email" name="email" id="email" onChange={changeEventHandler} />
                    </div>

                    <div className="mt-5">
                        <Label htmlFor="password" className="text-md">Password</Label>
                        <Input placeholder="Enter your password" type="password" name="password" id="password" onChange={changeEventHandler} />
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
                        isLoggingIn ? (
                            <Button className="w-full rounded my-5" variant="outline" disabled> <Loader className="mr-2 h-4 w-4 animate-spin" /></Button>

                        ) :
                            <Button className="w-full rounded my-5" variant="">Login</Button>

                    }
                    <span className="text-sm">Don't have an account ? <Link className="text-blue-600" to={"/signup"}>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login;