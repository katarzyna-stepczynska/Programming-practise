import React, { Component } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import classes from "./Auth.module.css";
import "@fontsource/mulish";

const theme = createTheme({
  palette: {
    color: {
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

const Auth = () => {
  const isSignUp = false;

  const handleSubmit = () => {};

  const handleChange = () => {};

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Paper sx={{ mt: 8, p: 2 }} className={classes.paper} elevation={3}>
          <Avatar sx={{ m: 1, bgcolor: "color.dark" }}></Avatar>
          <Typography variant="h5">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>
          <form sx={{ mt: 3, width: "100%" }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Grid xs={6} md={12}>
                    <TextField
                      name="firstName"
                      label="First Name"
                      handleChange={handleChange}
                      autofocus
                      xs={6}
                    />
                  </Grid>
                  <Grid xs={6} md={12}>
                    <TextField
                      name="firstName"
                      label="First Name"
                      handleChange={handleChange}
                      autofocus
                      xs={6}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Auth;
