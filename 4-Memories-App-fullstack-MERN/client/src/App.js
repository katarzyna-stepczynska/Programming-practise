import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import memoriesLogo from "./images/logo.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./App.module.css";
import "@fontsource/mulish";

const theme = createTheme({
  typography: {
    fontFamily: "Mulish, Arial, sans-serif",
  },
});

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <AppBar className={styles.appBar} position="static" color="inherit">
          <Typography className={styles.heading} variant="h4" align="center">
            Happy Memories
            <img
              className={styles.image}
              src={memoriesLogo}
              alt="memories"
              height="60"
            />
          </Typography>
        </AppBar>
        <Grow in>
          <Container>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                <Posts />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </ThemeProvider>
  );
};

export default App;
