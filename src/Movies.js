import { IconButton } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Counter } from "./Counter";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useHistory } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";

export function Movies({
  poster,
  name,
  rating,
  summary,
  id,
  _id,
  editButton,
  deleteButton,
}) {
  const [show, setshow] = useState();
  const history = useHistory();
  const styles = {
    color: rating < 8 ? "crimson" : "green",
    fontWeight: "bold",
  };
  return (
    <Card sx={{ maxWidth: 320, width: "100%" }}>
      <CardMedia
        component="img"
        height="350"
        image={poster}
        alt="Paella dish"
      />
      <CardActions className="details">
        <p className="title">
          {name}
          <IconButton
            onClick={() => {
              console.log(_id);
              history.push("/movielist/" + _id);
            }}
            className="movie-show-button"
            color="primary"
            aria-label="more info"
          >
            <InfoIcon />
          </IconButton>
        </p>
        <IconButton
          onClick={() => setshow(!show)}
          className="movie-show"
          color="primary"
        >
          {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        <p className="rating" style={styles}>
          <span role="img" aria-label="icon">
            ⭐
          </span>
          {rating}
        </p>
      </CardActions>
      {show ? <p>{summary}</p> : ""}
      <Counter editButton={editButton} deleteButton={deleteButton} />
    </Card>
  );
}
