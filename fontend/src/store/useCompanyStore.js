import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import toast from "react-hot-toast";

export const useCompanyStore = create((set) => ({
    company: null,
    getAllCompanies: null,
    isRegisteringCompany: false,
    isCheckingCompany: true,
    isGettingCompany: false,
    isUpdating : false,
    registerCompany: async (data) => {
        set({ isRegisteringCompany: true });
        try {
            const res = await axiosInstance.post("/company/register", data);
            set({company: res.data.company } );
            
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
            
            set({getAllCompanies: res.data.company});
            
            
        } catch (error) {
            console.log("error in getCompany", error);
            toast.error(error.response.data.message);
        }finally{
            set({ isGettingCompany: false });
        }
    },
    getCompanyById: async (id) => {
        console.log(id);
        set({ isGettingCompany: true });
        try {
            const res = await axiosInstance.get(`/company/${id}`);
            console.log(res);
            set({company: res.data.company});
            console.log("company fetched by id",res.data.company);
            
        } catch (error) {
            console.log("error in getCompany", error);
            toast.error(error.response.data.message);
        }finally{
            set({ isGettingCompany: false });
        }
    },
    updateCompany: async (data) => {
        set({ isRegisteringCompany: true, isUpdating: true });
        try {
            const res = await axiosInstance.put(`/company/update/${data.id}`, data);

            set({company: res.data.company } );
            console.log(res.data);
            toast.success("Company updated successfully");
        } catch (error) {
            console.log("error in registerCompany", error);
            toast.error(error.response.data.message);
        }
        finally {
            set({ isRegisteringCompany: false, isUpdating: false });
        }
    },

}))