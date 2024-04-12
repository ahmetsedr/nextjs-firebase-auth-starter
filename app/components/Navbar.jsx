import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { FaBars } from 'react-icons/fa';  // Hamburger menu icon
import { AiOutlineClose } from 'react-icons/ai';  // Close icon

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white shadow-md w-full flex flex-col md:flex-row items-center justify-between px-5 py-3 relative">
      <div className="flex justify-between items-center w-full md:w-auto">
        <a href="/" className="text-xl font-bold">Logo</a>
        <button className="text-3xl text-gray-800 md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>

      <ul className={`md:flex flex-col md:flex-row md:items-center md:justify-center absolute md:relative w-full md:w-auto left-0 bg-white z-50 transition-all ease-in-out duration-300 ${isMenuOpen ? "top-20" : "top-[-490px] md:top-0"}`}>
        <li className="px-4 py-2 text-center border-b md:border-none">
          <Link href="/">Home</Link>
        </li>
        <li className="px-4 py-2 text-center border-b md:border-none">
          <Link href="/about">About</Link>
        </li>
        {user && (
          <li className="px-4 py-2 text-center border-b md:border-none">
            <Link href="/profile">Profile</Link>
          </li>
        )}
        {loading ? (
          <div className="flex justify-center items-center py-2">Loading...</div>
        ) : user ? (
          <div className="px-4 py-2 flex flex-col md:flex-row md:items-center md:justify-end md:w-full">
            <span className="text-gray-800 text-sm font-medium">
              Welcome, {user.displayName}
            </span>
            <button onClick={handleSignOut} className="mt-2 md:mt-0 md:ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md cursor-pointer">
              Sign out
            </button>
          </div>
        ) : (
          <div className="px-4 py-2 flex flex-col md:flex-row md:items-center md:justify-end md:w-full">
            <button onClick={handleSignIn} className="mt-2 md:mt-0 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md cursor-pointer">
              Login
            </button>
            <button onClick={handleSignIn} className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black font-semibold rounded-md cursor-pointer">
              Sign up
            </button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
