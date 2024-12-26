import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [], // Array to store movies
      searchQuery: "Pokemon", // Default search query
      currentPage: 1, // Current page for pagination
      moviesPerPage: 10, // Movies per page
    };
  }

  componentDidMount() {
    // Fetch movies when the component mounts with the default search query
    this.fetchMovies(this.state.searchQuery);
  }

  fetchMovies = (query) => {
    // Replace with your actual API key
    fetch(`https://www.omdbapi.com/?apikey=your_api_key&s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // Debugging
        if (data.Search) {
          this.setState({ movies: data.Search });
        } else {
          this.setState({ movies: [] }); // Clear movies if no results
        }
      })
      .catch((error) => console.error("Error fetching movies:", error));
  };

  handleSearch = (e) => {
    const query = e.target.value;
    this.setState({ searchQuery: query, currentPage: 1 }, () => {
      this.fetchMovies(query);
    });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { movies, currentPage, moviesPerPage, searchQuery } = this.state;

    // Pagination logic
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    return (
      <div className="home-container">
        {/* Search input */}
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={this.handleSearch}
            placeholder="Search for a movie"
          />
        </div>

        {/* Movies grid */}
        {currentMovies.length > 0 ? (
          <div className="movies-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Release Date</th>
                  <th>IMDb ID</th>
                </tr>
              </thead>
              <tbody>
                {currentMovies.map((movie) => (
                  <tr key={movie.imdbID}>
                    <td>
                      <Link to={`movies/${movie.imdbID}`} className="text-link">
                        {movie.Title}
                      </Link>
                    </td>
                    <td>{movie.Year}</td>
                    <td>{movie.imdbID}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="search-warning">
            <p>No movies found. Try searching for another title!</p>
          </div>
        )}

        {/* Pagination */}
        {movies.length > moviesPerPage && totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                className={number === currentPage ? "active" : ""}
                onClick={() => this.handlePageChange(number)}
              >
                {number}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
