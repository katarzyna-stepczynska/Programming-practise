import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import {
  AppBar,
  Typography,
  Avatar,
  Toolbar,
  Button,
  Grid,
} from "@mui/material";
import memoriesLogo from "../../images/logo.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./Navbar.module.css";
import "@fontsource/mulish";

const theme = createTheme({
  palette: {
    button: {
      main: "#5788fa",
      light: "#bdc6e3",
      dark: "#2e47ad",
      contrastText: "#000000",
    },
    typography: {
      fontFamily: "Mulish, Arial, sans-serif",
    },
  },
});

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    // navigate("/", { replace: true });
    navigate("../", { replace: true });

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  console.log(user);

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        sx={{
          my: 3,
          p: 1,
          borderRadius: "20px",
          bgcolor: "rgba(255, 255, 255, 0.7)",
        }}
        position="static"
      >
        <Grid container display="flex" justifyContent="space-between">
          <Toolbar>
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "Mulish",
                color: "#2e47ad",
                textTransform: "uppercase",
                textDecoration: "none",
                mx: 2,
              }}
              variant="h5"
              component={Link}
              to="/"
            >
              Happy Memories
            </Typography>
            <img src={memoriesLogo} alt="memories-icon" height="30" />
          </Toolbar>
          <Toolbar>
            {user ? (
              <div className={styles.profile}>
                {/* <Avatar
                  className={styles.avatar}
                  alt={user.result.name}
                  src={user.result.imageUrl}
                >
                  {user.result.name.charAt(0)}
                </Avatar> */}
                {/* <Typography className={styles.userName} variant="h6">
                  {user.result.name}
                </Typography> */}
                <Button
                  variant="contained"
                  className={styles.logout}
                  color="secondary"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                sx={{ bgcolor: "button.main" }}
                component={Link}
                to="/auth"
                variant="contained"
              >
                Sign In
              </Button>
            )}
          </Toolbar>
        </Grid>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
