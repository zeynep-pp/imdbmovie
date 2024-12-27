import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import Input from "../components/Input";
import Card from "../components/Card";
import moment from "moment";
import "../styles/Home.scss";
import "../styles/styles.scss";

const Home = () => {
  const { setSearch, movies, favoriteHandler, setContentType, handleYearChange } = useContext(MovieContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);
  const [year, setYearFilter] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleContentTypeChange = (e) => {
    setContentType(e.target.value);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies?.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setSearch("Pokemon");
  }, []);

  return (
    <div className="home-container">
      <Input handleSearch={handleSearch} />
      <div className="filters form-inline">
        <select className="form-control mb-2 mr-sm-2" onChange={handleContentTypeChange} defaultValue="movie">
          <option value="movie">Movies</option>
          <option value="series">TV Series</option>
          <option value="episode">TV Series Episodes</option>
        </select>

        <input
          type="number"
          className="form-control mb-2 mr-sm-2"
          placeholder="Enter Year"
          value={year}
          onChange={(e) => {
            setYearFilter(e.target.value);
            handleYearChange(e); // Dispatch to Redux
          }}
        />
      </div>

      {movies?.length > 0 ? (
        <>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Title - Detail Link</th>
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
                  <td>{moment(movie.Year, "YYYY").format("MMMM YYYY")}</td>
                  <td>{movie.imdbID}</td>
                  <td>
                    <Card
                      image={movie.Poster}
                      title={movie.Title}
                      year={moment(movie.Year, "YYYY").format("MMMM YYYY")}
                      addFavorite={(e) => favoriteHandler(movie, e)}
                      isFavorite={movie.isFavorite}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-container">
            <span className="pagination-info">
              Showing {indexOfFirstMovie + 1} to {indexOfLastMovie} of {movies.length} entries
            </span>
            <nav aria-label="Page navigation">
              <ul className="pagination">
                {Array.from({ length: Math.ceil(movies.length / moviesPerPage) }, (_, index) => (
                  <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => paginate(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      ) : (
        <div className="alert alert-warning" role="alert">
          <p>Search a movie!</p>
          <p>i.e. Ted</p>
        </div>
      )}
    </div>
  );
};

export default Home;
