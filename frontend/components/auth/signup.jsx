"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {SignUp} from "@/actions/authaction/signup.js"
const Initial={
    message: null,
    success: false
}

const Register = () => {
    const [state, action] = useFormState(SignUp,Initial)
    if (state.success) {
        useRouter().push('/')
    } 
    return (
        <form action={action} >
            <Card className="p-6 space-y-4 w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create a new account</CardTitle>
                    <CardDescription>
                        Enter your details to get started
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="mb-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input type="name" placeholder="Name" name="userName"/>
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="email">Your email address</Label>
                        <Input type="email" placeholder="Email" name="userEmail"/>
                    </div>
                    {/* {state?.errors?.email && (
                       <p className="text-sm text-red-500">{state.errors.email}</p>
                   )} */}
                    <div>
                        <Label htmlFor="password">Enter your password</Label>
                        <Input type="password" placeholder="password" name="password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">Sign up</Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default Register