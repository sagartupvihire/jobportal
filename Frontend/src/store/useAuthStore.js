import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggedIn: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isResumeUploading : false,
    isCheckingAuth: true,

    checkAuth: async () => {

        try {
            console.log("checking auth");

            const res = await axiosInstance.get("/auth/checkauth")

            set({ authUser: res.data.userData, isCheckingAuth: false, isLoggedIn: true })
            console.log("authUser", res.data.userData);
            
        } catch (error) {
            console.log("error in checkAuth", error)
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/register", data)
            set({ authUser: res })
            toast.success("Account created successfully")
        } catch (error) {
            console.log("error in signup", error);
            toast.success(error.response.data.message)
        }
        finally {
            set({ isSigningUp: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null, isLoggedIn: false })
            toast.success("Logout successful")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("error in logout", error)
        }
    },

    login: async (data) => {
        try {
            set({ isLoggingIn: true })
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res })
            toast.success("Login successful")
        } catch (error) {

            console.log("error in login", error);
            toast.error(error.response.data.message)
        } finally {
            set({ isLoggingIn: false })
        }
    },

    updateProfile: async (data) => {
        try {
            set({ isUpdatingProfile: true })
            const res = await axiosInstance.post("/user/updateprofile", data)

            console.log(res)
            toast.success("Profile updated successfully")

        } catch (error) {
            console.log("error in updateProfile", error);
            toast.error(error.response.data.message)
        } finally {
            set({ isUpdatingProfile: false })
        }
    }
    ,

    updateProfilePic: async (data) => {
        try {
            const res = await axiosInstance.post("/user/updateprofilepic", data)
            set({ authUser: res })
            toast.success("Profile pic updated successfully")
        } catch (error) {
            console.log("error in updateProfilePic", error);
            toast.error(error.response.data.message)
        }
    },
    updateResume: async (resume) => {
        try {
            set({ isResumeUploading: true });
            const formData = new FormData();
            formData.append('resume', resume);

            const res = await axiosInstance.post("/user/uploadresume", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            set({ authUser: res.data.user });
            toast.success("Resume uploaded successfully");
        } catch (error) {
            console.log("error in uploadResume", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isResumeUploading: false });
        }
    }
})); 