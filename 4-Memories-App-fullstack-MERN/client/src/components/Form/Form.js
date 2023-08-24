import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import classes from "./Form.module.css";
import "@fontsource/mulish";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
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
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            value={postData.creator}
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
          />
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
            sx={{ mt: 1, bgcolor: "button.main", mx: "10px" }}
            variant="contained"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            sx={{ mt: 1, bgcolor: "button.light", mx: "10px", mb: "10px" }}
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
