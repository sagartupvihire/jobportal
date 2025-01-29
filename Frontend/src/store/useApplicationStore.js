import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import toast from "react-hot-toast";



export const useApplicationStore = create((set)=>({

    application: '',
    applicationStatus : '',
    appliedJobs :'',
    getApplicants : async (id) => {
        try {
            const res = await axiosInstance.get(`/application/getapplicants/${id}`);
            set({ application: res.data });
            
            
        } catch (error) {
            console.log("error in getApplication", error);
            toast.error(error.response.data.message);
        }
    },

    updateApplicationStatus : async (status,id) => {
        try {
            const res = await axiosInstance.put(`application/status/${id}/update`, status);
            set({ applicationStatus: res.data });
            toast.success("Status Updated Successfully");
        } catch (error) {
            console.log("error in getApplication", error);
            toast.error(error.response.data.message);
        }
    },

    getAppliedJob : async () =>{
        try {
            const res = await axiosInstance.get(`application/getappliedjobs`)
            console.log("res",res.data)
            set({appliedJobs : res.data})
        } catch (error) {
            console.log("error in getAppliedJob", error)
        }
    }


}))