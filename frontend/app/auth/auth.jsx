"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { GraduationCap } from "lucide-react";
import Login from '@/components/auth/signin';
import Register from '@/components/auth/signup';
export const Auth = () => {
  const [active, setactive] = useState('signin')
  const handleTabChange=(value)=>{
    setactive(value)
  }


  return (
    <div className='flex flex-col min-h-screen'>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold text-xl">LMS LEARN</span>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          value={active}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
               <Login/>
          </TabsContent>
          <TabsContent value="signup">
            <Register />
          </TabsContent>

        </Tabs>
      </div>



    </div>
  )
}
