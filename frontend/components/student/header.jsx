'use client'
import React,{useContext} from 'react'
import { AuthContext } from '@/context/auth-context';
import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Button } from '../ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Header = () => {
    const { logout } = useContext(AuthContext);
    const router =useRouter() 
    function handleLogout() {
      logout();
    }

    function handlenavigate (){
      router.push('/student/boughtCourse')
    }

  return (
    <header className="flex items-center justify-between p-4 border-b relative">
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center hover:text-black">
          <GraduationCap className="h-8 w-8 mr-4 " />
          <span className="font-extrabold md:text-xl text-[14px]">
            LMS LEARN
          </span>
        </Link>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            onClick={() => {
                router.push("/student/courses") 
            }}
            className="text-[14px] md:text-[16px] font-medium"
          >
            Explore Courses
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex gap-4 items-center">
          <div
            onClick={handlenavigate}
            className="flex cursor-pointer items-center gap-3"
          >
            <span className="font-extrabold md:text-xl text-[14px]">
              My Courses
            </span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
          </div>
          <Button onClick={handleLogout}>Sign Out</Button>
        </div>
      </div>
    </header>
  )
}

export default Header