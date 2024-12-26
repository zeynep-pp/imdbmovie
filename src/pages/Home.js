import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import Input from "../components/Input";
import Card from "../components/Card";
import "../styles/Home.css";

const Home = () => {
  const { setSearch, movies, favoriteHandler, setYear } = useContext(MovieContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);
  const [contentType, setContentType] = useState("movie"); // Default: Movies
  const [year, setYearFilter] = useState(""); // Year filter state

  // Handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Handle year filter change
  const handleYearChange = (e) => {
    setYearFilter(e.target.value);
    setYear(e.target.value); // Update year in context
  };

  // Handle content type change (Movies, TV Series, Episodes)
  const handleContentTypeChange = (e) => {
    setContentType(e.target.value);
  };

  // Pagination: Get current movies for the page
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies?.slice(indexOfFirstMovie, indexOfLastMovie);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setSearch("Pokemon"); // Set default search to "Pokemon"
  }, []);

  return (
    <div className="home-container">
      <Input handleSearch={handleSearch} />

      {/* Content Type Filter */}
      <div className="filters">
        <select onChange={handleContentTypeChange} value={contentType}>
          <option value="movie">Movies</option>
          <option value="series">TV Series</option>
          <option value="episode">TV Series Episodes</option>
        </select>

        {/* Year Filter */}
        <input
          type="number"
          placeholder="Enter Year"
          value={year}
          onChange={handleYearChange}
        />
      </div>

      {movies?.length > 0 ? (
        <>
          {/* Movie Grid/Table */}
          
          <table className="movies-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Release Date</th>
                <th>IMDb ID</th>
                <th>Favorite</th>
              </tr>
            </thead>
            <tbody>
              {currentMovies?.map((movie) => (
                <tr key={movie.imdbID}>
                  <td>
                    <Link to={`/movies/${movie.imdbID}`} className="text-link">
                      {movie.Title}
                    </Link>
                  </td>
                  <td>{movie.Year}</td>
                  <td>{movie.imdbID}</td>
                  <td>
                    <Card
                      image={movie.Poster}
                      title={movie.Title}
                      year={movie.Year}
                      addFavorite={(e) => favoriteHandler(movie, e)}
                      isFavorite={movie.isFavorite}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="pagination">
            {Array.from({ length: Math.ceil(movies.length / moviesPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="search-warning">
          <p>Search a movie!</p>
          <p>i.e. Ted</p>
        </div>
      )}
    </div>
  );
};

export default Home;
