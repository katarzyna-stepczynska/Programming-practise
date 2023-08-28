import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Input from "./Input";
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
  const [showPassword, setShowPassword] = useState(false);
  const isSignUp = false;

  const handleSubmit = () => {};

  const handleChange = () => {};

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Paper sx={{ mt: 8, p: 2 }} elevation={3}>
          <Avatar sx={{ m: 1, bgcolor: "color.dark" }}></Avatar>
          <Typography variant="h5">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>
          <form sx={{ mt: 3, width: "100%" }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autofocus
                    half
                  />
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Adress"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <Button
              spacing={(3, 0, 2)}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Auth;
