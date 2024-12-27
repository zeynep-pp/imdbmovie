import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setYear } from '../redux/actions';

export const MovieContext = createContext();

const API_KEY = '44a627e9'; // OMDb API Key

const MovieApp = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('Pokemon'); // Default search term set to "Pokemon"
  const [selectedMovie, setSelectedMovie] = useState('');
  const [contentType, setContentType] = useState('movie'); // Default: Movies
  
  // Access year from Redux store
  const year = useSelector((state) => state.year);

  const dispatch = useDispatch();

  // Fetch movies with optional year and content type filter
  const fetchMovies = async (searchValue, year, type) => {
    let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}&type=${type}`;
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

  // Use useEffect to fetch movies whenever search, year, or contentType changes
  useEffect(() => {
    if (search) {
      fetchMovies(search, year, contentType);
    }
  }, [search, year, contentType]);

  // Add or remove from favorites
  const favoriteHandler = (movie, e) => {
    e.preventDefault();
    if (favorites.includes(movie)) {
      removeFavoriteMovie(movie);
    } else {
      addFavoriteMovie(movie);
    }
  };

  const removeFavoriteMovie = (movie) => {
    movie.isFavorite = false;
    const newFavoriteList = favorites.filter(
      (fav) => fav.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
  };

  const addFavoriteMovie = (movie) => {
    movie.isFavorite = true;
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
  };

  // Fetch movie details
  const showDetail = async (id) => {
    const response = await axios(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
    const data = response.data;
    setSelectedMovie(data);
  };

  // Function to update the year using Redux
  const handleYearChange = (e) => {
    dispatch(setYear(e.target.value));
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
        setContentType,
        handleYearChange, // Provide this function to Home component
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieApp;
