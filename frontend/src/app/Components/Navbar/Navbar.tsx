"use client"

import React, { useState } from 'react'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-purple-500 p-2 rounded-full shadow-lg mt-4 w-full md:w-1/2 lg:w-3/4">
      <div className="flex items-center justify-between px-6">
        <div className="text-white font-bold text-lg">
          Inventory
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <a href="/login" className="text-white hover:text-gray-200">
            Login
          </a>
          <a href="/signup" className="text-white rounded-full hover:bg-gray-200 px-4 py-1">
            Sign up
          </a>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 space-y-2">
          <a href="/login" className="text-white hover:text-gray-200">
            Login
          </a>
          <a href="/signup" className="text-white rounded-full hover:bg-gray-200 px-4 py-1">
            Sign up
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar