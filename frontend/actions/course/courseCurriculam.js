
import axiosInstance from "@/app/api/axiosInstance";
export async function mediaUpload(formData, onProgressCallback){
    const { data } = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API}media/upload`, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgressCallback(percentCompleted);
        },
      });
    
      return data;
 


     
}


export async function mediaBulkUpload(formData,onProgressCallback) {
     const {data} = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API}media/bulk-upload`,formData,{
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgressCallback(percentCompleted);
      },
    });  
   
     return data

}




export async function mediaDelete(id){
  const { data } = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API}media/delete/${id}`);
   
  return data;
   
}