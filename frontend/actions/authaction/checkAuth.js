"use server"
import axiosInstance from "@/app/api/axiosInstance";
export async function checkAuth() {
    const { data } = await axiosInstance.get("api/auth/check-auth");
  
    return data;
}