"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ProfilePage: React.FC = () => {
    const [name, setName] = useState('')
    const[companyName, setCompnayName] = useState('')
    const [profilePicture, setProfilePicture] = useState<File | null>(null)
    const router = useRouter()

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()

        if (!name || !companyName) {
            toast.error("Please fill in all the required field", {
                position: "top-center"
            })
            return
        }

        try {
            const formData = new FormData()
            const token = localStorage.getItem("token")

            if (!token) {
                toast.error("Authorization token is missing. Please log in again.", {
                    position: "top-center",
                })
                return
            }
            formData.append("Iname", name)
            formData.append("IcompanyName", companyName)
            if (profilePicture) {
                formData.append("profilePicture", profilePicture)
            }

            const response = await fetch("http://localhost:7565/api/profile/create", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })

            if (response.ok) {
                toast.success("Profile-saved Successfully!", {
                    position: "bottom-right"
                })

                localStorage.removeItem("token")

                setTimeout(() => {
                    router.push("/login")
                }, 1500)
            } else {
                toast.error("Failed to save profile!", {
                    position: "top-center"
                })
            }
        } catch (err) {
            console.error(err)
            toast.error(`Something went wrong. Please try again! ${err}`, {
                position: "top-center"
            })
        }
    }
    return (
        <div className="flex justify-center items-center h-screen pt-28">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="w-1/3">
                <h3 className="text-2xl font-bold text-center mb-6">Complete your Profile</h3>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-600">
                        Name
                    </label>
                    <input 
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded mt-1"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="companyName" className="block text-gray-600">
                        Company Name
                    </label>
                    <input 
                        type="text"
                        name="companyName"
                        placeholder="Enter your company name"
                        id="Company Name"
                        value={companyName}
                        onChange={(e) => setCompnayName(e.target.value)}
                        className="w-full border rounded mt-1"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="profilePicture" className="block text-gray-600">
                        Profile Picture
                    </label>
                    <input 
                        type="file"
                        name="profilePicture"
                        id="profilePicture"
                        onChange={(e) => {
                            if (e.target.files) {
                                setProfilePicture(e.target.files[0]);
                            }
                        }}
                        className="w-full border rounded mt-1"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
                >
                    Save Profile
                </button>
            </form>
        </div>
    )
}

export default ProfilePage