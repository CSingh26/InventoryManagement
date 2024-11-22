"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const SignUpPage: React.FC = () => {
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[email, setEmail] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!username || !password || !confirmPassword || !email) {
            toast.error("Please fill in all the fields!", {
                position: "top-center"
            })
            return
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!", {
                position: "top-center"
            })
            return
        }

        try {
            const response = await fetch("http://localhost:7565/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem("token", data.token)
                toast.success("Signup successfull!", {
                    position: "bottom-right"
                })
                setTimeout(() => router.push("/profile"), 3000)
            } else {
                toast.error(data.error || "Signup failed!", {
                    position: "top-center"
                })
            }
        } catch (e) {
            console.error(e)
            toast.error("Something went wrong. Please try again!", {
                position: "top-center"
            })
        }
    }
    return (
        <div className="flex-justify-center items-center h-screen pt-60">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="w-1/3">
            <h3 className="text-2xl font-bold text-center">Signup</h3>

            <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700">Username</label>
                    <input 
                        type="text"
                        placeholder="Username"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input 
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Passowrd</label>
                    <input 
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                    <input 
                        type="password"
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
                >
                    Signup
                </button>
            </form>
        </div>
    )
}

export default SignUpPage