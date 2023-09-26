import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Paper, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import TagsInput from "../TagsInput/TagsInput";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import styles from "./Home.module.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchByTitle, setSearchByTitle] = useState(null);

  const handleSearchByTitleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleSearchTitleChange = (e) => {
    setSearchByTitle(e.target.value);
  };

  const searchPost = (e) => {
    e.preventDefault();

    if (searchByTitle?.trim() || tags) {
      dispatch(getPostsBySearch({ searchByTitle, tags: tags.join(",") }));
      navigate(
        `../posts/search?searchQuery=${
          searchByTitle || "none"
        }&tags=${tags.join(",")}`,
        { replace: true }
      );
    } else {
      navigate("../", { replace: true });
    }
  };

  const handleSelectedTags = (items) => {
    console.log(items);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchTagsDelete = (item) => () => {
    const newSelectedItem = [...tags];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setTags(newSelectedItem);
  };

  const handleSearchByTagsKeyDown = (e) => {
    if (e.keyCode === 13) {
      const newSelectedItem = [...tags];
      const duplicatedValues = newSelectedItem.indexOf(e.target.value.trim());

      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }
      if (!e.target.value.replace(/\s/g, "").length) return;

      newSelectedItem.push(e.target.value.trim());
      setTags(newSelectedItem);
      setInputValue("");
    }
    if (tags.length && !inputValue.length && e.keyCode === 8) {
      setTags(tags.slice(0, tags.length - 1));
    }
  };
  const handleSearchTagsChange = (item) => {
    let newSelectedItem = [...tags];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");
    setTags(newSelectedItem);
  };

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

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
            className={styles.gridContainer}
          >
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: "20px",
                  bgcolor: "rgba(255, 255, 255, 0.7)",
                  mb: 1,
                }}
                display="flex"
                position="static"
                color="inherit"
              >
                <TextField
                  sx={{
                    fontFamily: "Mulish",
                  }}
                  name="search"
                  variant="outlined"
                  label="Search..."
                  onKeyPress={handleSearchByTitleKeyPress}
                  fullWidth
                  value={searchByTitle}
                  onChange={handleSearchTitleChange}
                />
                <TagsInput
                  selectedTags={handleSelectedTags}
                  fullWidth
                  variant="outlined"
                  id="tags"
                  name="tags"
                  placeholder="write a word and press enter to add"
                  label="Search Tags"
                  handleInputChange={handleInputChange}
                  handleDelete={handleSearchTagsDelete}
                  handleKeyDown={handleSearchByTagsKeyDown}
                  selectedItem={tags}
                  handleChange={handleSearchTagsChange}
                  inputValue={inputValue}
                  setSelectedItem={setTags}
                />
                <Button
                  sx={{ mt: 1, bgcolor: "button.main" }}
                  className={styles.searchButton}
                  variant="contained"
                  fullWidth
                  onClick={searchPost}
                >
                  Search
                </Button>
              </Paper>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper
                sx={{
                  p: 2,
                  borderRadius: "20px",
                  bgcolor: "rgba(255, 255, 255, 0.7)",
                  mt: 1,
                }}
                elevation={3}
                className={styles.pagination}
              >
                <Pagination />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </ThemeProvider>
  );
};

export default Home;
