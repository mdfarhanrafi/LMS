import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/context/auth-context";
import InstructorProvider from "@/context/instructor_context/instructorContext";
import StudentProvider from "@/context/student_context/student-context";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
      <InstructorProvider>
      <StudentProvider>  
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        </body>
        </StudentProvider>
        </InstructorProvider>
      </AuthProvider>

    </html>
  );
}
