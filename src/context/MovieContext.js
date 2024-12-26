import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MovieContext = createContext();

const API_KEY = '44a627e9'; // OMDb API Key

const MovieApp = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('Pokemon');  // Default search term set to "Pokemon"
  const [selectedMovie, setSelectedMovie] = useState('');
  const [year, setYear] = useState('');

  // Fetch movies with optional year filter
  const fetchMovies = async (searchValue, year) => {
    let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`;
    if (year) {
      url += `&y=${year}`;  // Add year filter to API query if year is provided
    }
    const response = await axios(url);
    const data = response.data;
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]); // No movies found, reset the list
    }
  };

  // Use useEffect to fetch movies whenever search or year changes
  useEffect(() => {
    if (search) {
      fetchMovies(search, year);
    }
  }, [search, year]);

  // Add or remove from favorites
  const favoriteHandler = (movie, e) => {
    e.preventDefault();
    const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
    if (isFavorite) {
      removeFavoriteMovie(movie);
    } else {
      addFavoriteMovie(movie);
    }
  };

  // Remove movie from favorites
  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(fav => fav.imdbID !== movie.imdbID);
    setFavorites(newFavoriteList);
  };

  // Add movie to favorites
  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
  };

  // Fetch movie details
  const showDetail = async (id) => {
    const response = await axios(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
    const data = response.data;
    setSelectedMovie(data);
  };

  return (
    <MovieContext.Provider
      value={{
        setSearch,
        movies,
        favorites,
        favoriteHandler,
        showDetail,
        selectedMovie,
        setYear, // Expose setYear to allow changing the year filter
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieApp;
