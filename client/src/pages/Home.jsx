import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
            Discover <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Cinematic</span> Magic
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
            Explore thousands of movies, save your favorites, and never miss a great film again. Your personal movie journey starts here.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <NavLink 
              to="/search" 
              className="group relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/50 flex items-center justify-center"
            >
              <span>Start Exploring</span>
              <svg className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </NavLink>
            <NavLink 
              to="/favorites" 
              className="px-8 py-4 text-lg font-medium text-white bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full hover:bg-gray-700/70 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
            >
              <span>My Favorites</span>
              <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </NavLink>
          </div>
        </div>
      </section>
      
      {/* Featured Movies Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 w-3/4 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
        
        <div className="relative z-10 text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Trending <span className="text-purple-400">Now</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Check out what everyone is watching right now
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="group relative aspect-[2/3] bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 p-4 w-full z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-white font-bold truncate">Movie Title {item}</h3>
                <p className="text-gray-400 text-sm">2023 • Action, Adventure</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <NavLink 
            to="/search" 
            className="inline-flex items-center px-6 py-3 border border-gray-700 text-sm font-medium rounded-full text-gray-300 hover:text-white hover:border-purple-500 hover:bg-gray-800/50 transition-all duration-300"
          >
            View All Movies
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </NavLink>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm py-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,transparent,white)]"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to explore more?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of movie enthusiasts and discover your next favorite film today.
          </p>
          <NavLink 
            to="/signup" 
            className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/50"
          >
            Get Started - It's Free
          </NavLink>
        </div>
      </div>
    </div>
  );
}
