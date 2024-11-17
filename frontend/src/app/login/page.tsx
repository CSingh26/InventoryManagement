"use client"

import React, { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const LoginPage: React.FC = () => {
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!username || !password) {
            toast.error("Please fill in all the fields!", {
                position: "top-center"
            })
            return
        }
    
        try {
            const response = await fetch("http://localhost:7565/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem("token", data.token)

                toast.success("Login successfull", {
                    position: "bottom-right"
                })
            } else {
                toast.error(data.error || "Login failed!", {
                    position: "top-center"
                })
            }
        } catch (e) {
            console.error(e)
            toast.error("SOmething went wrong. Please try again!", {
                position: "top-center"
            })
        }
    }
    return (
        <div className="flex-justify-center items-center h-screen pt-60">
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <h3 className="text-2xl font-bold text-center">Login</h3>

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
                    <label htmlFor="Password" className="block text-gray-700">Password</label>
                    <input 
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage