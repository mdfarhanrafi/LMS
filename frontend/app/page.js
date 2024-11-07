'use client'
import { AuthContext } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"
export default function Home() {
  const { auth, loading, logout } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !auth.Authenticate) {
      router.push('/auth')
    }
  }, [auth.Authenticate, loading, router])
  
  useEffect(() => {
    if (!loading && auth.Authenticate && auth?.user?.role === 'Admin'){
      router.push('/instructor/dashboard')
    }
  }, [auth.Authenticate, loading, router]) 
  
  useEffect(() => {
    if (!loading && auth.Authenticate && auth?.user?.role !== 'Admin'){
      router.push('/student')
    }
  }, [auth.Authenticate, loading, router])

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!auth.Authenticate) {
    return null
  }

  return (
    <>
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    </>
  )
}