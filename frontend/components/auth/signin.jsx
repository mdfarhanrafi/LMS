"use client"
import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useFormState} from 'react-dom';
import {SignIn} from "@/actions/authaction/signin.js"
import { AuthContext } from '@/context/auth-context'
const Intial = {
    message: null,
    success: false,
    data:{}
}
const Login = () => {
    const {login} = useContext(AuthContext)
    const router = useRouter()
    const [state, action] = useFormState(SignIn, Intial)
    if (state.success) {
        login(state.data)
        router.push('/')
    }

    return (
        <form action={action} >
            <Card className="p-6 space-y-4 w-full max-w-md">
                <CardHeader>
                    <CardTitle>Sign in to your account</CardTitle>
                    <CardDescription>
                        Enter your email and password to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="mb-2">
                        <Label htmlFor="email">Your email address</Label>
                        <Input type="email" placeholder="Email" name="userEmail" />
                    </div>
                    {/* {state?.errors?.email && (
                       <p className="text-sm text-red-500">{state.errors.email}</p>
                   )} */}
                    <div>
                        <Label htmlFor="password">Enter your password</Label>
                        <Input type="password" placeholder="password" name="password" />
                    </div>
                    {/* {state?.errors?.password && (
                       <p className="text-sm text-red-500">{state.errors.password}</p>
                   )} */}
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">Sign in</Button>
                </CardFooter>


            </Card>
        </form>
    )
}
export default Login