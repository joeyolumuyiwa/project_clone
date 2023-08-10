import React, { useEffect, useState } from "react";

function MovieCard(props) {
  const { movie } = props;
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?apikey=[yourkey]&i=${movie.imdbID}&plot=full`
    )
      .then((response) => response.json())
      .then((response) => setMovieDetails(response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      Movie Details
      {movieDetails.Title}
      IMDB Rating : {movieDetails.imdbRating}
      Description : {movieDetails.Plot}
      <img src={movieDetails.Poster} style={{ height: 200, width: 200 }} />
    </div> 

    
  );
}

export default MovieCard;
