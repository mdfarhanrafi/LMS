import axiosInstance from "@/app/api/axiosInstance";

export async function createPaymentService(formData) {
    const { data } = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API}student/order/create`, formData);
    return data;
}

export async function captureAndFinalizePaymentService(paymentId,payerId,orderId) {
   try {
     const { data } = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API}student/order/capture`, {
       paymentId,
       payerId,
       orderId,
     });
   
     return data;
    
   } catch (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      };
   }
    
}