import "./App.css";
import React, { useState, useEffect } from "react";
// import { Addcolor } from "./Addcolor";
import { Movielist } from "./Movielist";
import { Addmovie } from "./Addmovie";
import { Editmovie } from "./Editmovie";
import { Switch, Route, Redirect } from "react-router-dom";
import { Moviedetails } from "./Moviedetails";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import { API_URL } from "./glopal-constants.js";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";

export default function App() {
  const [movies, setmovies] = useState([]);
  const history = useHistory();
  const [mode, setMode] = useState("light");
  const toggleColorMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  useEffect(() => {
    fetch(`${API_URL}/movies`)
      .then((data) => data.json())
      .then((mvs) => setmovies(mvs));
  }, []);
  const [opened, setopened] = useState(false);
  const handleDrawerOpen = () => {
    setopened(true);
  };
  const handleDrawerClose = () => {
    setopened(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} style={{ borderRadius: "0", minHeight: "100vh" }}>
        <div className="App">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h5">Movies</Typography>
              <Button
                variant="text"
                color="inherit"
                sx={{ display: { xs: "none", sm: "block" } }}
                onClick={() => history.push("/Addmovies")}
              >
                Add movies
              </Button>
              <Button
                variant="text"
                color="inherit"
                sx={{ display: { xs: "none", sm: "block" } }}
                onClick={() => history.push("/movielist")}
              >
                Movielist
              </Button>
              {/* <Button
                variant="text"
                color="inherit"
                sx={{ display: { xs: "none", sm: "block" } }}
                onClick={() => history.push("/Addcolor")}
              >
                Addcolor
              </Button> */}
              <IconButton
                onClick={toggleColorMode}
                color="inherit"
                sx={{ marginLeft: "auto" }}
              >
                {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
              <IconButton
                onClick={handleDrawerOpen}
                color="inherit"
                sx={{ display: { xs: "block", sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                sx={{
                  width: "200px",
                  height: "100%",
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: "200px",
                    height: "100%",
                    boxSizing: "border-box",
                    backgroundColor: "#fff",
                    color: "black",
                    fontSize: "1em",
                    fontFamily: "Pacifico",
                  },
                }}
                anchor="right"
                open={opened}
              >
                <IconButton
                  color="inherit"
                  aria-label="close"
                  component="span"
                  onClick={handleDrawerClose}
                  sx={{ ml: "auto" }}
                >
                  <CloseIcon />
                </IconButton>
                <Button
                  variant="text"
                  color="inherit"
                  onClick={() => history.push("/Addmovies")}
                >
                  Add movies
                </Button>
                <Button
                  variant="text"
                  color="inherit"
                  onClick={() => history.push("/movielist")}
                >
                  Movielist
                </Button>
                {/* <Button
                  variant="text"
                  color="inherit"
                  onClick={() => history.push("/Addcolor")}
                >
                  Addcolor
                </Button> */}
              </Drawer>
            </Toolbar>
          </AppBar>

          <Switch>
            {/* Each route is case, eg. - case '/about': */}
            <Route exact path="/">
              <Redirect to="/movielist" />
            </Route>
            <Route path="/movielist/edit/:id">
              <Editmovie movies={movies} setmovies={setmovies} />
            </Route>
            <Route path="/movielist/:id">
              <Moviedetails />
            </Route>
            <Route path="/Addmovies">
              <Addmovie />
            </Route>
            <Route path="/films">
              <Redirect to="/movielist" />
            </Route>
            <Route path="/movielist">
              <Movielist />
            </Route>

            {/* <Route path="/Addcolor">
              <Addcolor />
            </Route> */}
            <Route path="**">
              <Notfound />
            </Route>
          </Switch>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

function Notfound() {
  return (
    <div>
      <img
        src="https://freefrontend.com/assets/img/html-funny-404-pages/CodePen-404-Page.gif"
        alt=""
      />
    </div>
  );
}
