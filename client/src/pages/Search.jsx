import React, { useState } from 'react';
import MovieCard from '../components/MovieCard.jsx';

// Mock API for demonstration purposes
const MoviesAPI = {
  search: async (query) => {
    console.log(`Searching for: ${query}`);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    if (query.toLowerCase().includes("not found")) {
        return { data: { Response: 'False', Error: 'Movie not found!' } };
    }
    if (query.toLowerCase().includes("empty")) {
        return { data: { Search: [] } };
    }
    // Sample successful response
    return {
      data: {
        Response: 'True',
        Search: [
          { imdbID: 'tt0133093', Title: 'The Matrix', Year: '1999', Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', Type: 'movie' },
          { imdbID: 'tt0137523', Title: 'Fight Club', Year: '1999', Poster: 'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', Type: 'movie' },
          { imdbID: 'tt0816692', Title: 'Interstellar', Year: '2014', Poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', Type: 'movie' },
          { imdbID: 'tt1375666', Title: 'Inception', Year: '2010', Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg', Type: 'movie' },
          { imdbID: 'tt0468569', Title: 'The Dark Knight', Year: '2008', Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg', Type: 'movie' },
          { imdbID: 'tt0111161', Title: 'The Shawshank Redemption', Year: '1994', Poster: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg', Type: 'movie' },
        ],
      }
    };
  }
};


export default function Search() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const onSearch = async (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    setResults([]);
    setErr('');
    setHasSearched(true);
    try {
      const { data } = await MoviesAPI.search(q.trim());
      if (data?.Response === 'False') {
        setResults([]);
        setErr(data?.Error || 'No results found.');
      } else {
        setResults(data?.Search || []);
      }
    } catch {
      setErr('The search request failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-gray-800 rounded-lg h-96 animate-pulse"></div>
      ))}
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-900 text-gray-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Explore the Cinematic Universe
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-400">
            Dive into a galaxy of films. Search for classics, blockbusters, and hidden gems.
          </p>
        </div>

        <form onSubmit={onSearch} className="max-w-2xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="relative w-full px-8 py-4 text-lg text-white bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Inception, The Dark Knight..."
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute top-0 right-0 h-full px-6 text-white rounded-full flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 transition-transform duration-300"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </div>
        </form>

        {/* --- Content Area --- */}
        <div>
          {loading && <SkeletonLoader />}

          {!loading && err && (
            <div className="max-w-3xl mx-auto bg-red-900/50 border border-red-700 text-red-300 px-6 py-4 rounded-lg flex items-center space-x-4">
              <svg className="h-8 w-8 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-bold">An Error Occurred</h3>
                <p className="text-sm">{err}</p>
              </div>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-purple-500 pl-4">
                Search Results
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {results.map((m) => (
                  <div key={m.imdbID} className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                    <MovieCard movie={m} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && hasSearched && results.length === 0 && !err && (
            <div className="text-center py-16">
              <div className="inline-block bg-gray-800 p-6 rounded-full">
                  <svg className="h-16 w-16 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">No Movies Found</h3>
              <p className="mt-2 text-gray-400">We couldn't find any movies matching your search. Please try a different query.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

