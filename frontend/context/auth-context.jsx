"use client"
import { useRouter } from "next/navigation";
import {createContext, useState,useEffect,useCallback} from "react"
import axios from "axios";
export const AuthContext = createContext() 

export default function AuthProvider({ children }){
    const [loading, setLoading] = useState(true)
    const router= useRouter()
    const [accessToken,setaccessToken] = useState('')
    const [auth,setAuth] = useState({
        Authenticate:false,
        user:null
    })
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    useEffect(()=>{
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const token =JSON.parse(localStorage.getItem('acessToken'));
      if (userInfo) {
          setAuth({
            Authenticate:true,
            user:userInfo
        });
          setaccessToken(token)
      }
      setLoading(false);
    },[])
    
    const login =(userData)=>{
      console.log(userData)
      localStorage.setItem('user', JSON.stringify(userData.user));
      localStorage.setItem('accessToken',JSON.stringify(userData.accessToken))
      setAuth({
        Authenticate:true,
        user:userData.user
    })
    }
  
   
    const logout = useCallback(() => {
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      setAuth({
          Authenticate: false,
          user: null
      })
      setaccessToken('')
      // Use push after state updates
      setTimeout(() => {
          router.push('/auth')
      }, 0)
  }, [router])

    return <AuthContext.Provider value={{auth,setAuth,login,logout,loading,setLoading}}>
         {children}
    </AuthContext.Provider>

}