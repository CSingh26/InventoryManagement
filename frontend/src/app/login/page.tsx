"use client"

import React, { useState } from "react"

const LoginPage: React.FC = () => {
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!username || !password) {
            setError('Please fill in both fields!')
            return
        }

        setError('')
    
        console.log('Login Submitted!', {
            username,
            password
        })
    }
    return (
        <div className="flex-justify-center items-center h-screen pt-60">
            <form onSubmit={handleSubmit}>
                <h3 className="text-2xl font-bold text-center">Login</h3>
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