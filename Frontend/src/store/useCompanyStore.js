import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import toast from "react-hot-toast";

export const useCompanyStore = create((set) => ({
    company: null,
    getAllCompanies: null,
    isRegisteringCompany: false,
    isCheckingCompany: true,
    isGettingCompany: false,

    registerCompany: async (data) => {
        set({ isRegisteringCompany: true });
        try {
            const res = await axiosInstance.post("/company/register", data);
            set({company: res.data.company } );
            console.log(res.data);
            toast.success("Company registered successfully");
        } catch (error) {
            console.log("error in registerCompany", error);
            toast.error(error.response.data.message);
        }
        finally {
            set({ isRegisteringCompany: false });
        }
    },
    getCompany: async () => {
        set({ isGettingCompany: true });
        try {
            const res = await axiosInstance.get("/company/getcompany");
            console.log(res);
            set({getAllCompanies: res.data.company});
            console.log("company fetched",res.data.company);
            
        } catch (error) {
            console.log("error in getCompany", error);
            toast.error(error.response.data.message);
        }finally{
            set({ isGettingCompany: false });
        }
    }
}))