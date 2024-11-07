"use server"
import axios from "axios"
export async function SignUp(prevState, formData) {
    const userName = formData.get("userName") 
    const userEmail = formData.get("userEmail")
    const password = formData.get("password")
    const payload = {
       userName, userEmail, password
    }

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API}api/auth/registerUser`, payload)
        if (response.data.success) {
            return {
                success: true,
                message: response.data.message,
                
            }
        } else {
            return {
                success: false,
                message: response.data.message
            }
        }
    } catch (error) {
        console.log(error)
        return {
            message: "something is wrong",
            success: false
        }
    }



}