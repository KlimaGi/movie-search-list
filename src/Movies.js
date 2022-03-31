import React from "react";
import { useState } from "react";
import "./styles/styles.scss";

import useIcon from "./functions/useIcon";
import movieIcon from "./styles/assets/movieIcon.svg";

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
    <div className="parent-div">
      <header>
        <useIcon icon={movieIcon} name="movie icon" />

        <input
          value={selectedMovie}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="Enter movie name"
        />
      </header>

      {showResults && (
        <ul className="results">
          {this.state.movies.map((movie, index) => (
            <Movie
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date}
              onClickMovie={selectMovie}
              indexKey={index}
            />
          ))}
        </ul>
      )}
      <div className="other-content"></div>
    </div>
  );
};

function Movie(props) {
  return (
    <li
      key={props.indexKey}
      className="one-movie"
      onClick={() => {
        props.onClickMovie(props.title);
      }}
    >
      <div>
        <div className="title">{props.title}</div>
        <div>
          {props.rating} Rating, {props.year.slice(0, 4)}
        </div>
      </div>
    </li>
  );
}
