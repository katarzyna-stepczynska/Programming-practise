import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Typography, Avatar, Toolbar, Button } from "@mui/material";
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
  const user = null;

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        sx={{
          my: 3,
          p: 1,
          borderRadius: "20px",
          bgcolor: "rgba(255, 255, 255, 0.7)",
        }}
        className={styles.appBar}
        position="static"
        color="inherit"
      >
        <div>
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
            align="center"
            component={Link}
            to="/"
          >
            Happy Memories
          </Typography>
          <img
            className={styles.image}
            src={memoriesLogo}
            alt="memories-icon"
            height="30"
          />
        </div>
        <Toolbar className={styles.toolbar}>
          {user ? (
            <div className={styles.profile}>
              <Avatar
                className={styles.avatar}
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={styles.userName} variant="h6">
                {user.result.name}
              </Typography>
              <Button
                variant="contained"
                className={styles.logout}
                color="secondary"
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
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
