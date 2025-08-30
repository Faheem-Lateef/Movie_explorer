import React, { useEffect, useState } from 'react';
import { FavoritesAPI } from '../services/api';
import { useNavigate, NavLink } from 'react-router-dom';

// Mock FavoritesAPI if not available
const mockFavoritesAPI = {
  list: async () => ({
    data: {
      favorites: [
        // Sample data for demo
        {
          _id: '1',
          title: 'Inception',
          year: '2010',
          poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
        },
        {
          _id: '2',
          title: 'The Dark Knight',
          year: '2008',
          poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        },
      ],
    },
  }),
  remove: async (id) => {
    // Mock removal
    return new Promise((resolve) => setTimeout(resolve, 500));
  },
};

// Use the mock API if the real one isn't available
const API = FavoritesAPI || mockFavoritesAPI;

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadFavorites = async () => {
    setError('');
    setLoading(true);
    try {
      const { data } = await API.list();
      setItems(data?.favorites || []);
    } catch (err) {
      console.error('Error loading favorites:', err);
      setError('Failed to load your favorites. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (id) => {
    try {
      await API.remove(id);
      setItems((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error('Error removing favorite:', err);
      setError('Failed to remove from favorites');
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">My Favorites</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse">
                <div className="aspect-[2/3] bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                  <div className="mt-4 h-10 bg-gray-700 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
        <div className="text-center max-w-md">
          <div className="text-red-400 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={loadFavorites}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!items.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🎬</div>
          <h2 className="text-3xl font-bold text-white mb-4">No favorites yet</h2>
          <p className="text-gray-300 mb-8">You haven't added any movies to your favorites yet. Start exploring to find movies you love!</p>
          <NavLink
            to="/search"
            className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/50"
          >
            Browse Movies
          </NavLink>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6 md:p-12 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-96 -right-96 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-48 left-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          My <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Favorites</span>
        </h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-700 text-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {items.map((movie) => (
            <div key={movie._id} className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700/50 hover:border-purple-500/50">
              <div className="aspect-[2/3] overflow-hidden">
                <img
                  src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <button
                    onClick={() => removeFavorite(movie._id)}
                    className="w-full py-2 px-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white truncate">{movie.title}</h3>
                <p className="text-sm text-gray-400">{movie.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
