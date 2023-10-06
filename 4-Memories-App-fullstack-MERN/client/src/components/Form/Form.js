import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost, updatePost } from "../../actions/posts";
import classes from "./Form.module.css";
import "@fontsource/mulish";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

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

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name }),
        navigate
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper
        sx={{ p: 2, borderRadius: "20px", bgcolor: "rgba(255, 255, 255, 0.7)" }}
        elevation={3}
      >
        <Typography
          sx={{
            textTransform: "uppercase",
            fontFamily: "Mulish",
            fontSize: "1em",
          }}
          align="center"
          color="color.dark"
        >
          Please Sign In to create your own memories and like other's memorie's.
        </Typography>
      </Paper>
    );
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{ p: 2, borderRadius: "20px", bgcolor: "rgba(255, 255, 255, 0.7)" }}
        elevation={3}
      >
        <form
          className={classes.form}
          sx={{ p: 1 }}
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <Typography
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              fontFamily: "Mulish",
              fontSize: "1em",
              color: "#2e47ad",
            }}
            variant="h6"
          >
            {currentId ? "Editing" : "Creating"} a Memory
          </Typography>
          <TextField
            sx={{ m: 1 }}
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            sx={{ m: 1 }}
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            sx={{ m: 1 }}
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setPostData({ ...postData, selectedFile: base64 });
              }}
            />
          </div>
          <Button
            sx={{ mt: 1, bgcolor: "color.main", mx: "10px" }}
            variant="contained"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            sx={{ mt: 1, bgcolor: "color.light", mx: "10px", mb: "10px" }}
            variant="contained"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </ThemeProvider>
  );
};

export default Form;
