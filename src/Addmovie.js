import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_URL } from "./glopal-constants.js";

export function Addmovie() {
  const history = useHistory();
  // const [name, setname] = useState("");
  // const [rating, setrating] = useState("");
  // const [poster, setposter] = useState("");
  // const [summary, setsummary] = useState("");
  // const [trailer, settrailer] = useState("");
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        rating: "",
        poster: "",
        summary: "",
        trailer: "",
      },
      // validate: validateForm,
      validationSchema: formvalidationSchema,
      // only no errors is sbmitted by validate form with call
      onSubmit: (newmovie) => {
        console.log("onSubmit", newmovie);
        addmovies(newmovie);
      },
    });

  const addmovies = (newmovie) => {
    // const newmovie = {
    //   poster: poster,
    //   name: name,
    //   rating: rating,
    //   summary: summary,
    //   trailer: trailer,
    // };
    console.log(newmovie);
    // setmovies([...movies, newmovie]);

    // fetch(`https://6166c53713aa1d00170a6755.mockapi.io/movies`, {
    fetch(`${API_URL}/movies`, {
      method: "POST",
      body: JSON.stringify(newmovie),
      headers: { "Content-Type": "application/json" },
    }).then(() => history.push("/movielist"));
  };
  return (
    <section className="addmov">
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ margin: "10px" }}
          fullWidth
          id="poster"
          name="poster"
          label="Poster url"
          variant="standard"
          // onChange={(event) => setposter(event.target.value)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.poster}
          error={errors.poster && touched.poster}
          helperText={errors.poster && touched.poster && errors.poster}
        />
        <TextField
          sx={{ margin: "10px" }}
          fullWidth
          id="name"
          name="name"
          label="Movie Name"
          variant="standard"
          // onChange={(event) => setname(event.target.value)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          error={errors.name && touched.name}
          helperText={errors.name && touched.name && errors.name}
        />
        <TextField
          sx={{ margin: "10px" }}
          fullWidth
          id="rating"
          name="rating"
          label="Rating"
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
          fullWidth
          multiline
          id="summary"
          name="summary"
          label="Summary"
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
          Add Movie
        </Button>
      </form>
    </section>
    // <div className="add-movie-form">
    //   <TextField
    //     required
    //     id="standard-basic"
    //     label="trailer"
    //     variant="standard"
    //     onChange={(event) => settrailer(event.target.value)}
    //     onBlur={handleBlur}
    //     value={trailer}
    //   />
    //   <Button type="submit" onClick={addmovies} variant="outlined">
    //     Add Movie
    //   </Button>
    // </div>
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
