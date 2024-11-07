'use client'
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

const useAuth = () => useContext(AuthContext);
  

export default useAuth;