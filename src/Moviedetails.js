import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";
import { API_URL } from "./glopal-constants.js";

export function Moviedetails() {
  const { id } = useParams();
  // const movie = movies[id];
  // console.log(movie);
  const [movie, setmovie] = useState({});
  useEffect(() => {
    fetch(`${API_URL}/movies/${id}`)
      .then((data) => data.json())
      .then((mv) => setmovie(mv));
  }, [id]);
  const styles = {
    color: movie.rating < 8 ? "crimson" : "green",
    fontWeight: "bold",
  };
  const history = useHistory();
  return (
    <div>
      <iframe
        width="100%"
        height="600"
        src={movie.trailer}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="movie-detail-container">
        <div className="movie-specs">
          <h3>{movie.name}</h3>
          <p style={styles}>
            <span role="img" aria-label="icon">
              ⭐
            </span>
            {movie.rating}
          </p>
        </div>
        <p>{movie.summary}</p>
      </div>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => history.goBack()}
      >
        Back
      </Button>
    </div>
  );
}
