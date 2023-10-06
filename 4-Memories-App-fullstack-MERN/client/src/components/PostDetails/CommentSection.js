import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import styles from "./PostDetails.module.css";

const CommentSection = ({ post }) => {
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

  console.log(post);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleAddComment = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className={styles.commentsOuterContainer}>
          <div className={styles.commentsInnerContainer}>
            <Typography
              sx={{
                fontFamily: "Mulish",
                color: "color.dark",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
              gutterBottom
            >
              Comments:
            </Typography>
            {comments?.map((comment, index) => (
              <Typography key={index} gutterBottom variant="subtitle1">
                <strong>{comment.split(": ")[0]}</strong>
                {comment.split(":")[1]}
              </Typography>
            ))}
            <div ref={commentsRef} />
          </div>
          {user?.result?.name && (
            <div style={{ width: "100%" }}>
              <Typography
                sx={{
                  fontFamily: "Mulish",
                  color: "color.main",
                  textTransform: "uppercase",
                  fontWeight: "light",
                  fontSize: "0.8rem",
                }}
                gutterBottom
              >
                Write a comment
              </Typography>
              <TextField
                fullWidth
                rows={2}
                variant="outlined"
                label="Comment"
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                style={{ marginTop: "10px" }}
                fullWidth
                disabled={!comment}
                variant="contained"
                onClick={handleAddComment}
                color="primary"
              >
                Add comment
              </Button>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CommentSection;
