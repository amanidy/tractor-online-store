"use client";
import { useState } from 'react';
import Link from "next/link";
import { useUser } from "../../context/userContext";

const UserProfile = () => {
  const { user, logout } = useUser();
  const [isHovered, setIsHovered] = useState(false);

  const dashboardLinks = [
    { 
      role: "seller", 
      href: "/seller", 
      label: "Seller Dashboard",
      className: "text-blue-500 hover:text-blue-600"
    },
    { 
      role: "admin", 
      href: "/admin", 
      label: "Admin Dashboard", 
      className: "text-red-500 hover:text-red-600"
    },
    { 
      role: "buyer", 
      href: "/dashboard/buyer", 
      label: "Buyer Dashboard", 
      className: "text-red-500 hover:text-red-600"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div 
        className={`
          p-6 bg-white shadow-lg rounded-xl max-w-md w-full mx-auto 
          transform transition-all duration-300 ease-in-out
          ${isHovered ? 'scale-105 shadow-xl' : 'scale-100 shadow-md'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {user ? (
          <div className="space-y-5">
            <div className="flex items-center space-x-4 transition-all">
              <div 
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center 
                  text-white text-2xl font-bold
                  bg-gradient-to-r from-blue-400 to-purple-500
                  transform transition-transform duration-300
                  ${isHovered ? 'rotate-6' : 'rotate-0'}
                `}
              >
                {user.name[0].toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 transition-colors">
                  Welcome, {user.name}
                </h2>
                <p className="text-sm text-gray-500 capitalize">
                  {user.role} Account
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {dashboardLinks
                .filter(link => link.role === user.role)
                .map((link) => (
                  <Link 
                    key={link.role}
                    href={link.href} 
                    className={`
                      ${link.className} 
                      block font-medium underline 
                      transition-all duration-300 
                      hover:translate-x-2
                    `}
                  >
                    {link.label}
                  </Link>
                ))
              }
            </div>

            <button
              onClick={logout}
              className={`
                w-full bg-red-500 text-white px-4 py-2 rounded-lg 
                hover:bg-red-600 transition-all duration-300
                transform hover:scale-105 active:scale-95
                flex items-center justify-center space-x-2
              `}
            >
              <span>Logout</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-gray-600 transition-colors">
              Please log in to access your profile.
            </p>
            <Link 
              href="/pages/login" 
              className={`
                inline-block bg-blue-500 text-white px-4 py-2 
                rounded-lg hover:bg-blue-600 
                transition-all duration-300
                transform hover:scale-105 active:scale-95
              `}
            >
              Log In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;