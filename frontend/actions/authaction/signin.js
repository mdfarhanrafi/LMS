"use server"
import axios from "axios"
export async function SignIn(prevState, formData) {
    const userEmail = formData.get('userEmail')
    const password = formData.get('password')
    const payload = {
        userEmail, password
    }
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API}api/auth/loginUser`, payload)
        if (response.data.success) {
            return {
                message: 'Login successful',
                success: true,
                data: response.data.data
                // user: response.data.data.user,
                // token: response.data.data.access_token
            }
        } else {
            return {
                success: false,
                message: response.data.message || 'Login failed'
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