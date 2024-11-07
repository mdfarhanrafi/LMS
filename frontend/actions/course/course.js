
import axiosInstance from "@/app/api/axiosInstance";
export async function newCourse(formData) {
    const { data } = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API}instructor/course/add`,formData);
    return data;

}
export async function fetchallCourseById(id) {
    const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API}instructor/course/get/details/${id}`);
    return data;
   

}
export async function fetchallCourse() {
    const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API}instructor/course/get`);
    return data;
   

}
export async function updateCourseById(id,formData) {
    const { data } = await axiosInstance.put(`${process.env.NEXT_PUBLIC_API}instructor/course/update/${id}`,formData);
    return data;
}

