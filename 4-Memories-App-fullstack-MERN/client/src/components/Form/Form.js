import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";
import classes from "./Form.module.css";
import "@fontsource/mulish";

const Form = () => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
  };

  const theme = createTheme({
    palette: {
      button: {
        main: "#5788fa",
        light: "#bdc6e3",
        dark: "#2e47ad",
        violet: "#9332ad",
      },
      typography: {
        fontFamily: "Mulish, Arial, sans-serif",
      },
    },
  });

  const clear = () => {};
  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ p: 2 }} className={classes.paper} elevation={3}>
        <form
          className={classes.form}
          sx={{ p: 1 }}
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <Typography
            className={classes.title}
            color="button.dark"
            variant="h6"
          >
            Creating a Memory
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
            onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
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
            sx={{ mt: 1, bgcolor: "button.main" }}
            variant="contained"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            sx={{ mt: 1, bgcolor: "button.light" }}
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
