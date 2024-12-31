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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="https://www.w3schools.com/howto/img_avatar.png" 
              alt="Logo" 
              className="h-10 w-10 rounded-full border-2 border-indigo-400 hover:border-indigo-300 transition-all duration-300 hover:scale-105"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white hover:bg-indigo-700/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
            >
              Ana Sayfa
            </Link>
            {user && (
              <>
                <Link 
                href="/profile" 
                className="block text-gray-300 hover:text-white hover:bg-indigo-700/50 px-3 py-2 rounded-md text-base font-medium"
              >
                Profil
              </Link>
              <Link 
                href="/addList" 
                className="block text-gray-300 hover:text-white hover:bg-indigo-700/50 px-3 py-2 rounded-md text-base font-medium"
              >
                Ekle
              </Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!loading && (
              <>
                {user?.displayName ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-300">{user.displayName}</span>
                    <button
                      onClick={handleSignOut}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
                    >
                      Çıkış
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSignIn}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
                  >
                    Giriş
                  </button>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-700/50 focus:outline-none"
            >
              {isMenuOpen ? <AiOutlineClose className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              className="block text-gray-300 hover:text-white hover:bg-indigo-700/50 px-3 py-2 rounded-md text-base font-medium"
            >
              Ana Sayfa
            </Link>
            {user && (
              <>
                <Link 
                href="/profile" 
                className="block text-gray-300 hover:text-white hover:bg-indigo-700/50 px-3 py-2 rounded-md text-base font-medium"
              >
                Profil
              </Link>
              <Link 
                href="/addList" 
                className="block text-gray-300 hover:text-white hover:bg-indigo-700/50 px-3 py-2 rounded-md text-base font-medium"
              >
                Ekle
              </Link>
              </>
            )}
            {!loading && user?.displayName && (
              <div className="px-3 py-2">
                <span className="block text-sm text-gray-300 mb-2">{user.displayName}</span>
                <button
                  onClick={handleSignOut}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  Çıkış
                </button>
              </div>
            )}
            {!loading && !user && (
              <button
                onClick={handleSignIn}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 mx-3"
              >
                Giriş
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;