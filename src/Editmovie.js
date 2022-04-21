import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_URL } from "./glopal-constants.js";

export function Editmovie() {
  const { id } = useParams();
  const [movie, setmovie] = useState(null);
  useEffect(() => {
    fetch(`${API_URL}/movies/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mv) => setmovie(mv));
  }, [id]);
  // const movie = movies[id];
  // console.log(movie,id);

  return movie ? <Updatemovie movie={movie} /> : "";
}
function Updatemovie({ movie }) {
  const history = useHistory();
  // const [name, setname] = useState(movie.name);
  // const [rating, setrating] = useState(movie.rating);
  // const [poster, setposter] = useState(movie.poster);
  // const [summary, setsummary] = useState(movie.summary);
  // const [trailer, settrailer] = useState(movie.trailer);
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        name: movie.name,
        rating: movie.rating,
        poster: movie.poster,
        summary: movie.summary,
        trailer: movie.trailer,
      },
      // validate: validateForm,
      validationSchema: formvalidationSchema,
      // only no errors is sbmitted by validate form with call
      onSubmit: (updatedmovie) => {
        console.log("onSubmit", updatedmovie);
        editmovies(updatedmovie);
      },
    });

  const editmovies = (updatedmovie) => {
    // const updatedmovie = {
    //   poster: poster,
    //   name: name,
    //   rating: rating,
    //   summary: summary,
    //   trailer: trailer,
    // };
    fetch(`${API_URL}/movies/${movie._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedmovie),
      headers: { "Content-Type": "application/json" },
    }).then(() => history.push("/movielist"));
  };
  return (
    <section className="addmov">
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ margin: "10px" }}
          id="poster"
          name="poster"
          label="Poster url"
          variant="standard"
          fullWidth
          // onChange={(event) => setposter(event.target.value)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.poster}
          error={errors.poster && touched.poster}
          helperText={errors.poster && touched.poster && errors.poster}
        />
        <TextField
          sx={{ margin: "10px" }}
          id="name"
          name="name"
          label="Movie Name"
          variant="standard"
          fullWidth
          // onChange={(event) => setname(event.target.value)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          error={errors.name && touched.name}
          helperText={errors.name && touched.name && errors.name}
        />

        <TextField
          sx={{ margin: "10px" }}
          id="rating"
          name="rating"
          label="Rating"
          fullWidth
          variant="standard"
          // onChange={(event) => setrating(event.target.value)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.rating}
          error={errors.rating && touched.rating}
          helperText={errors.rating && touched.rating && errors.rating}
        />

        <TextField
          sx={{ margin: "10px" }}
          id="summary"
          name="summary"
          label="Summary"
          fullWidth
          multiline
          variant="standard"
          // onChange={(event) => setsummary(event.target.value)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.summary}
          error={errors.summary && touched.summary}
          helperText={errors.summary && touched.summary && errors.summary}
        />

        <TextField
          sx={{ margin: "10px" }}
          id="trailer"
          name="trailer"
          label="trailer"
          variant="standard"
          fullWidth
          // onChange={(event) => settrailer(event.target.value)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.trailer}
          error={errors.trailer && touched.trailer}
          helperText={errors.trailer && touched.trailer && errors.trailer}
        />
        <Button type="submit" variant="outlined">
          save
        </Button>
      </form>
    </section>
  );
}
const formvalidationSchema = Yup.object({
  name: Yup.string().required("Why not fill this movie name 🤯"),
  rating: Yup.number()
    .required("Why not fill this password 🤯")
    .min(0, "Too low rating")
    .max(10, "Too much rating"),
  poster: Yup.string()
    .min(4, "given the correct url of the poster")
    .required("why not fill the poster url"),
  summary: Yup.string()
    .min(4, "too short summary")
    .required("why not fill the summary"),
  trailer: Yup.string().required("why not fill embed youtube code").min(4),
});
