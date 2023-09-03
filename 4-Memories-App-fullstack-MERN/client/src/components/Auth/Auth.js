import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import Input from "./Input";
import { signIn, signUp } from "../../actions/auth";
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

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (isSignUp) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword(false);
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const googleSuccess = async (res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("../", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (err) => {
    console.log(err);
    console.log("Login Failed");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Paper
          sx={{
            mt: 8,
            p: 2,
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
          elevation={3}
        >
          <Grid
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar sx={{ m: 1, backgroundColor: "color.dark" }}>
              <LockIcon />
            </Avatar>
            <Typography
              sx={{
                pb: 2,
                fontFamily: "Mulish",
              }}
              variant="h5"
              color="color.dark"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Typography>
          </Grid>
          <form sx={{ mt: 3, width: "100%" }} onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
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
                    name="lastName"
                    label="Last Name"
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
            {/* {user ? (
              <div>Logged In</div>
            ) : ( */}
            <GoogleLogin
              onSuccess={googleSuccess}
              onError={googleFailure}
              cookiePolicy="single_host_origin"
            />
            {/* )} */}
            <Button
              sx={{ mt: 2 }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Button onClick={switchMode} sx={{ textTransform: "inherit" }}>
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Auth;
