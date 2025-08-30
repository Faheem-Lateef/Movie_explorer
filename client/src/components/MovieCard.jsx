import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { FavoritesAPI } from '../services/api';

// Mock FavoritesAPI for demonstration
const FavoritesAPI = {
  add: async (movie) => {
    console.log('Adding to favorites:', movie);
    await new Promise(resolve => setTimeout(resolve, 500));
    alert(`${movie.title} added to favorites!`);
  }
};


export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const { imdbID, Title, Year, Poster } = movie;

  const onAdd = async (e) => {
    // Stop the click from propagating to the details link
    e.stopPropagation(); 
    if (!token) return navigate('/login');
    try {
      await FavoritesAPI.add({
        movieId: imdbID,
        title: Title,
        poster: Poster !== 'N/A' ? Poster : '',
        year: Year,
      });
    } catch (e) {
      alert('Failed to add favorite');
    }
  };
  
  const onDetails = (e) => {
    e.stopPropagation();
    navigate(`/movie/${imdbID}`);
  }

  return (
    <div 
      onClick={onDetails} // Card itself is clickable for details
      className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-purple-900/40 transform hover:-translate-y-2 cursor-pointer aspect-[2/3]"
    >
      {/* Poster Image */}
      <img
        src={Poster !== 'N/A' ? Poster : 'https://placehold.co/300x450/111827/4b5563?text=No+Image'}
        alt={`Poster for ${Title}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/300x450/111827/4b5563?text=No+Image';
        }}
      />
      
      {/* Permanent Gradient Overlay for Text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      {/* Hover Overlay for Actions */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
        {/* Details Button */}
        <button
          onClick={onDetails}
          className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full text-white transform transition-all duration-300 hover:scale-110 hover:bg-purple-600 flex items-center justify-center"
          title="View details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>

        {/* Add to Favorites Button */}
        <button
          onClick={onAdd}
          className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full text-white transform transition-all duration-300 hover:scale-110 hover:bg-pink-600 flex items-center justify-center"
          title="Add to favorites"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Permanent Text Content */}
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-white text-lg font-bold leading-tight line-clamp-2" title={Title}>
          {Title}
        </h3>
        <p className="text-gray-400 text-sm mt-1">{Year}</p>
      </div>
    </div>
  );
}