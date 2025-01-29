import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useJobStore = create((set) => ({
    job: null,
    jobById : null,
    searchToQueryJob: null,
    getJob: async () => {
        try {
            const res = await axiosInstance.get(`/job/getjob`);
            set({ job: res.data.jobs });
            
            
        } catch (error) {
            console.log("error in getJob", error);
            toast.error(error.response.data.message);
        }
    },

    getJobById: async (id) => {
        try {
            const res = await axiosInstance.get(`/job/getjob/${id}`);
            set({ jobById: res.data.job });
            console.log("job fetched by id",res.data.job);
            
        } catch (error) {
            console.log("error in getJob", error);
            toast.error(error.response.data.message);
        }
    },

    applyJob: async (id) => {
        try {
            console.log("inside appling job");
            const res = await axiosInstance.post(`/application/apply/${id}`);
            console.log(res);
            toast.success("Job applied successfully");
        } catch (error) {
            console.log("error in applyJob", error);
            toast.error(error.response.data.message);
        }
    },
    searchQuery: async (query) => {

        try {
            console.log("inside search usejob query", query);
            const res = await axiosInstance.get(`/job/getjob/?keyword=${query}`);
            set({ job: res.data.jobs });
            console.log("job fetched by search",res.data.jobs);
            
            console.log("inside search usejob query", query);
        } catch (error) {
            console.log("error in getJob", error);
            toast.error(error.response.data.message);
        }
    },
}));