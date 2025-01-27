import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import toast from "react-hot-toast";



export const useApplicationStore = create((set)=>({

    application: '',
    getApplicants : async (id) => {
        try {
            const res = await axiosInstance.get(`/application/getapplicants/${id}`);
            set({ application: res.data });
            
            
        } catch (error) {
            console.log("error in getApplication", error);
            toast.error(error.response.data.message);
        }
    }
}))