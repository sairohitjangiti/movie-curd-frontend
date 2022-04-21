import { Movies } from "./Movies";
import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import { API_URL } from "./glopal-constants.js";

export function Movielist() {
  const [movies, setmovies] = useState([]);
  const getmovies = () => {
    fetch(`${API_URL}/movies`)
      .then((data) => data.json())
      .then((mvs) => setmovies(mvs));
  };
  useEffect(getmovies, []);

  const deletemovie = (_id) => {
    fetch(`${API_URL}/movies/${_id}`, {
      method: "DELETE",
    }).then(() => getmovies());
  };
  const history = useHistory();
  return (
    <section className="movie-list">
      {movies.map(({ name, poster, rating, summary, id, _id }) => (
        <Movies
          key={_id}
          poster={poster}
          name={name}
          rating={rating}
          summary={summary}
          id={id}
          _id={_id}
          deleteButton={
            <IconButton
              onClick={() => deletemovie(_id)}
              className="movie-show-button"
              color="error"
              aria-label="delete movie"
            >
              <DeleteIcon />
            </IconButton>
          }
          editButton={
            <IconButton
              onClick={() => history.push("/movielist/edit/" + _id)}
              className="movie-show-button"
              color="secondary"
              aria-label="edit movie"
              style={{ marginLeft: "auto" }}
            >
              <EditIcon />
            </IconButton>
          }
        />
      ))}
    </section>
  );
}
