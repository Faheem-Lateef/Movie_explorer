import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  // Redesigned class function for navigation links
  const linkCls = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
      isActive
        ? 'bg-white/10 text-white shadow-md'
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`;

  return (
    // Revamped header with a sleek, sticky, glassmorphism effect
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Enhanced Logo */}
          <NavLink to="/" className="flex items-center space-x-3">
            <span className="text-4xl">🎬</span>
            <span className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Movie Explorer
            </span>
          </NavLink>

          {/* Desktop Navigation with improved styling */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink to="/" className={linkCls}>Home</NavLink>
            <NavLink to="/search" className={linkCls}>Search</NavLink>
            {token && <NavLink to="/favorites" className={linkCls}>Favorites</NavLink>}
            
            {!token ? (
              <div className="flex items-center space-x-2 pl-4">
                {/* Secondary "Login" button */}
                <NavLink 
                  to="/login" 
                  className="px-4 py-2 rounded-full text-sm font-medium border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
                >
                  Login
                </NavLink>
                {/* Primary "Sign Up" button with gradient and hover effect */}
                <NavLink 
                  to="/signup" 
                  className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Sign Up
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center space-x-4 pl-4">
                <span className="text-sm text-gray-300 font-medium">Welcome, {username || 'User'}</span>
                {/* Restyled Logout button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-red-600 transition-all duration-300 ease-in-out flex items-center space-x-2 transform hover:scale-105"
                >
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </nav>

          {/* Mobile menu button - styled for consistency */}
          <div className="md:hidden flex items-center">
            <button className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - restyled to match the new theme */}
      {/* Note: This menu's visibility should be controlled by state, but per instructions, only CSS was changed. */}
      <div className="md:hidden bg-gray-800/90 border-t border-gray-700">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Home</NavLink>
            <NavLink to="/search" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Search</NavLink>
            {token && <NavLink to="/favorites" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Favorites</NavLink>}
        </div>
      </div>
    </header>
  );
}