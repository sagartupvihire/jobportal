import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { useAuthStore } from "@/store/useAuthStore"
import toast from "react-hot-toast"

const UpdateProfile = ({ open, setOpen }) => {
    
    const {authUser, isUpdatingProfile, updateProfile } = useAuthStore()
   
    
    const [InputValue, setInputValue] = useState({
        authUserId : authUser._id,
        name : authUser.name || "",
        email : authUser.email || "",
        bio : authUser.bio || "",
        phonenumber : authUser.phonenumber || "",
        skills : authUser.skills || "",
        file : null,
    })

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setInputValue({ ...InputValue, file });
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setOpen(false)
        updateProfile(InputValue)
    }


    


    return (
        <div >
            <Dialog  open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px] rounded-xl">
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                        <DialogDescription>
                            Update your profile
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="name" name="n    ame" placeholder="Name" value={InputValue.name} onChange={(e) => setInputValue({ ...InputValue, name: e.target.value })} className="col-span-3 rounded"  ></Input>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input id="email" name="email" placeholder="Email" value={InputValue.email} onChange={(e) => setInputValue({ ...InputValue, email: e.target.value })} className="col-span-3 rounded"  ></Input>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phonenumber" className="text-right">Phone Number</Label>
                                <Input id="phonenumber" name="phonenumber" placeholder="Phone Number" value={InputValue.phonenumber} onChange={(e) => setInputValue({ ...InputValue, phonenumber: e.target.value })} className="col-span-3 rounded"  ></Input>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <Input id="bio" name="bio" placeholder="Bio" className="col-span-3 rounded" value={InputValue.bio} onChange={(e) => setInputValue({ ...InputValue, bio: e.target.value })}  ></Input>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="Skills" className="text-right">Skills</Label>
                                <Input id="skills" name="skills" placeholder="Skills" className="col-span-3 rounded" value={InputValue.skills} onChange={(e) => setInputValue({ ...InputValue, skills: e.target.value })}  ></Input>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="File" className="text-right">File</Label>
                                <Input type="file" id="File" name="File" placeholder="File" className="col-span-3 rounded" accept="image/*" 
                                onChange={handleFileChange} ></Input>
                            </div>
                            

                        </div>
                        <DialogFooter>
                            {
                                isUpdatingProfile ?
                                    <Button v className="my-4 w-full rounded" disabled>Updating...</Button>
                                    :
                                    <Button className=" my-4 w-full rounded" >Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default UpdateProfile