"use client"

import React, { useState } from "react"

const SignUpPage: React.FC = () => {
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[email, setEmail] = useState('')
    const[error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!username || !password || !confirmPassword || !email) {
            setError('Please fill in all fields!')
            return
        }

        setError('')

        console.log('SignUp Submitted!', {
            username,
            email,
            password
        })
    }
    return (
        <div className="flex-justify-center items-center h-screen pt-60">
            <form onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold text-center">Signup</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}

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
                    Login
                </button>
            </form>
        </div>
    )
}

export default SignUpPage