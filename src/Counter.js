import { Badge } from "@mui/material";
import React from "react";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";

export function Counter({ editButton, deleteButton }) {
  const [like, setlike] = useState(0);
  const [dislike, setdislike] = useState(0);
  return (
    <CardActions>
      <IconButton onClick={() => setlike(like + 1)}>
        <Badge badgeContent={like} color="primary">
          <span role="img" aria-label="icon">
            👍
          </span>
        </Badge>{" "}
      </IconButton>

      <IconButton onClick={() => setdislike(dislike + 1)}>
        <Badge badgeContent={dislike} color="error">
          <span role="img" aria-label="icon">
            👎
          </span>
        </Badge>{" "}
      </IconButton>
      {editButton}
      {deleteButton}
    </CardActions>
  );
}
