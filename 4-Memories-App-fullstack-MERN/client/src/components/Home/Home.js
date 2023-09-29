import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid, Paper, TextField, Button } from "@mui/material";
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
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const [searchByTitle, setSearchByTitle] = useState("");
  const [selectedTagsItem, setSelectedTagsItem] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleSearchTitleChange = (e) => {
    setSearchByTitle(e.target.value);
  };

  const searchPost = (e) => {
    e.preventDefault();

    if (searchByTitle?.trim() || selectedTagsItem) {
      dispatch(
        getPostsBySearch({ searchByTitle, tags: selectedTagsItem.join(",") })
      );
      navigate(
        `../posts/search?searchQuery=${
          searchByTitle || "none"
        }&tags=${selectedTagsItem.join(",")}`,
        { replace: true }
      );
    } else {
      navigate("../", { replace: true });
    }
  };

  const handleSelectedTags = (items) => {
    // console.log(items);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchTagsDelete = (item) => () => {
    const newSelectedItem = [...selectedTagsItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedTagsItem(newSelectedItem);
  };

  const handleSearchByTagsKeyDown = (e) => {
    if (e.keyCode === 13) {
      const newSelectedItem = [...selectedTagsItem];
      const duplicatedValues = newSelectedItem.indexOf(e.target.value.trim());

      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }
      if (!e.target.value.replace(/\s/g, "").length) return;

      newSelectedItem.push(e.target.value.trim());
      setSelectedTagsItem(newSelectedItem);
      setInputValue("");
    }
    if (selectedTagsItem.length && !inputValue.length && e.keyCode === 8) {
      setSelectedTagsItem(
        selectedTagsItem.slice(0, selectedTagsItem.length - 1)
      );
    }
  };
  const handleSearchTagsChange = (item) => {
    let newSelectedItem = [...selectedTagsItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");
    setSelectedTagsItem(newSelectedItem);
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
                  name="memories"
                  id="memories"
                  variant="outlined"
                  label="Search title of post"
                  onKeyPress={handleKeyPress}
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
                  selectedItem={selectedTagsItem}
                  handleChange={handleSearchTagsChange}
                  inputValue={inputValue}
                  setSelectedItem={setSelectedTagsItem}
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
              {!searchQuery && !selectedTagsItem.length && (
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
                  <Pagination page={page} />
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </ThemeProvider>
  );
};

export default Home;
