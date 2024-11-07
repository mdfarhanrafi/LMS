"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import useAuth from "@/lib/hooks/useAuth"

export default function ProtectedRoute ({children}){

    const { auth, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        // Only redirect after loading is complete and we know the user isn't authorized
        if (!loading && (!auth?.Authenticate || auth?.user?.role !== "Admin")) {
            router.push('/auth')
        }
    }, [auth, loading, router])

    // Show loading state while checking authentication
    if (loading) {
        return <div>Loading...</div>
    }

    // Only render the instructor content if user is authenticated and is an admin
    if (!auth?.Authenticate || auth?.user?.role !== "Admin") {
        return null // Return null while redirect happens
    }



     
    return auth?.user?.role ==='Admin' && <>{children}</>
        


}

