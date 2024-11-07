"use client"

import Header from "@/components/student/header";


export default function RootLayout({ children }) {
  return (
  
    <div >  
         <Header/>  
         {children}
     
    </div>

  );
}
