"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all the fields!", {
        position: "top-center",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:7565/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);

        toast.success("Login successful", {
          position: "bottom-right",
        });
      } else {
        toast.error(data.error || "Login failed!", {
          position: "top-center",
        });
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please try again!", {
        position: "top-center",
      });
    }
  };

  return (
    <div
      className="flex h-screen"
      style={{
        background: `radial-gradient(circle, #433D8B, #2E236C, #17153B)`,
      }}
    >
      {/* Left side */}
      <div className="hidden md:block w-1/2 bg-black"></div>

      {/* Right side with styled card */}
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <div
          className="bg-white bg-opacity-90 rounded-[32px] shadow-2xl p-10 w-full max-w-md"
          style={{
            backdropFilter: "blur(20px)", // Gives frosted glass effect
          }}
        >
          <div className="flex justify-center mb-8">
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-10"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 mt-2 mb-8">
            Enter your email and password to access your account
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-2"
                />
                <label htmlFor="remember" className="text-gray-700 text-sm">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition duration-300"
            >
              Sign In
            </button>
            <div className="flex justify-center items-center my-6">
              <span className="text-sm text-gray-600 mx-2">or</span>
            </div>
            <button
              type="button"
              className="w-full py-3 bg-white text-black border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 flex justify-center items-center"
            >
              <img
                src="/google-icon.svg"
                alt="Google"
                className="h-5 mr-2"
              />
              Sign in with Google
            </button>
          </form>
          <div className="text-center mt-8">
            <span className="text-gray-600 text-sm">
              Don't have an account?
            </span>{" "}
            <a href="/signup" className="text-indigo-600 font-medium hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;