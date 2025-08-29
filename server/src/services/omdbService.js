// server/src/services/omdbService.js
const axios = require('axios');

const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

// Search movies
exports.searchMovies = async (query) => {
  const res = await axios.get(BASE_URL, { params: { s: query, apikey: API_KEY } });
  return res.data;
};

// Get movie details by ID
exports.getMovieDetails = async (id) => {
  const res = await axios.get(BASE_URL, { params: { i: id, apikey: API_KEY } });
  return res.data;
};
