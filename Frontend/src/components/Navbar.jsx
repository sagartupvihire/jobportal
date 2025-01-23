/* eslint-disable no-unused-vars */
import { LogOut, User2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useEffect, useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Link, Navigate, useNavigate } from "react-router-dom"



const Navbar = () => {
    const navigate = useNavigate()
    const { authUser, checkAuth, isCheckingAuth, logout } = useAuthStore()

    // useEffect(() => {
    //     checkAuth()
    // }, [checkAuth,authUser,logout])


    return (
        <div className="bg-white">
            <div className="flex justify-between items-center p-4 max-w-7xl mx-auto h-24 ">
                <div>
                    <Button variant="link hover:outline-none" onClick={() => navigate("/")}> <h1 className="text-2xl font-bold cursor-pointer">Job<span className="text-red-600">Portal</span></h1></Button>
                </div>

                <div className="flex items-center gap-12">
                    <ul className="flex space-x-4 font-medium items-center gap-5">
                        {
                            authUser?.role === "recuiter" ? (
                                <>

                                    <li ><Link to="admin/jobs">Jobs</Link></li>
                                    <li><Link to="admin/companies">Companies</Link></li>
                                </>
                            ) : (
                                <>

                                    <li className="hover:text-purple-600 border-white hover:border-b-2 hover:border-purple-600 transition-all"><Link className="p-2 block" to="/">Home</Link></li>
                                    <li className="hover:text-purple-600 border-white hover:border-b-2 hover:border-purple-600  transition-all"><Link className="p-2  block" to="/jobs">Jobs</Link></li>
                                    <li className="hover:text-purple-600 border-white hover:border-b-2 hover:border-purple-600  transition-all"><Link className="p-2 block" to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !authUser ? (
                            <div className="flex items-center gap-4 ">
                                <Link to="/login"><Button variant="outline" className=" rounded ">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-purple-600 hover:bg-purple-700 rounded ">Signup</Button></Link>
                            </div>
                        )
                            : (


                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage className="cursor-pointer rounded-full object-cover" src={authUser.profilepic || "https://github.com/shadcn.png"} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-88 ">
                                        <div className="flex gap-4 space-y-2">
                                            <Avatar className="cursor-pointer object-cover">
                                                <AvatarImage className="cursor-pointer rounded-full object-cover" src={authUser.profilepic || "https://github.com/shadcn.png"} />
                                            </Avatar>
                                            <div>

                                                <h4 className="font-medium ">{authUser.name}</h4>
                                                <p className="text-sm text-muted-foreground">Full stack developer </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col space-y-2 text-gray-600">
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <User2 />
                                                <Link className="outline-none" to="/profile"><Button variant="link">View Profile</Button></Link>
                                            </div>
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <LogOut />
                                                <Button variant="link" onClick={logout} >Logout</Button>
                                            </div>
                                        </div>

                                    </PopoverContent>

                                </Popover>
                            )}

                </div>
            </div>
        </div>
    )
}

export default Navbar