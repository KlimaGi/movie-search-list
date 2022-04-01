import React from "react";
import { useState } from "react";
import "./styles/styles.scss";

import { Icon } from "./components/Icon";
export const Movies = () => {
  const [showResults, setShowResults] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");

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
        });
      setShowResults(true);
    }
  };

  const selectMovie = (movieTitle) => {
    setSelectedMovie(movieTitle);
    setShowResults(false);
    setMovies([]);
  };

  return (
    <div className="other-content">
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

          {showResults && (
            <ul className="results">
              {movies.map((movie) => (
                <Movie
                  title={movie.title}
                  rating={movie.vote_average}
                  year={movie.release_date}
                  onClickMovie={selectMovie}
                  keyId={movie.id}
                />
              ))}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
};

function Movie(props) {
  return (
    <li
      key={props.keyId}
      className="one-movie"
      onClick={() => {
        props.onClickMovie(props.title);
      }}
    >
      <div>
        <div className="title">{props.title}</div>
        <div>
          {props.rating} Rating, {props.year.slice(0, 4)}, key is {props.keyId}
        </div>
      </div>
    </li>
  );
}
