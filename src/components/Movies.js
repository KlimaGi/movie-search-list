import React from "react";
import { useState } from "react";
import { Icon } from "./Icon";
import { Movie } from "./Movie";
import "../styles/styles.scss";

export const Movies = () => {
  const [showResults, setShowResults] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [isError, setError] = useState(false);

  const handleFocus = () => {
    setSelectedMovie("");
  };

  const handleChange = (event) => {
    setSelectedMovie(event.target.value);

    if (event.target.value.length >= 3) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${event.target.value}`
      )
        .then((response) => response.json())
        .then((json) => {
          const moviesResult = json.results.slice(0, 8);

          setMovies(moviesResult);
        })
        .catch((error) => {
          setShowResults(false);
          setError(true);
        });
      setShowResults(true);
      setError(false);
    } else {
      setShowResults(false);
      setError(true);
    }
  };

  const handleSelect = (movieTitle) => {
    setSelectedMovie(movieTitle);
  };

  return (
    <div className="white-lay">
      <header>
        <div className="input-div">
          <Icon />
          <input
            value={selectedMovie}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleFocus}
            placeholder="Enter movie name"
          />
        </div>
      </header>
      {showResults && (
        <ul className="results-ul-li">
          {movies.map((movie) => (
            <Movie
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date}
              onClickMovie={handleSelect}
              keyId={movie.id}
            />
          ))}
        </ul>
      )}
      {isError && <div className="results-ul-li error-text">No results.</div>}
    </div>
  );
};
