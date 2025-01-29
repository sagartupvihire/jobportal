import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";



export const useAdminJob = create((set)=>({
    AdminJobs : '',
    postjob :   '',
    isPostingJob : false,

    getAdminjobs : async () =>{
        try{
            const res = await axiosInstance.get('/job/getadminjob')
            
            set({AdminJobs : res.data}) 
        }catch(error){
            console.log(error.data.message)
        }
    },

    postJob : async (data) =>{
        try{
            set({isPostingJob: true}) 
            const res = await axiosInstance.post('/job/postjob',data)
            
            set({postjob : res})
            toast.success("Job Create Succesfully")
        }catch(error){
            console.log(error.response.data.message)
            toast.error(error.response.data.message || "something went wrong")
        }finally{
            set({isPostingJob :false})
        }
    }
}))