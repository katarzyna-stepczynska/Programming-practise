import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./PostDetails.module.css";
import "@fontsource/mulish";

const PostDetails = () => {
  // console.log("Post details");
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper
        sx={{ p: 2, borderRadius: "20px", bgcolor: "rgba(255, 255, 255, 0.7)" }}
        elevation={6}
        className={styles.loadingPaper}
      >
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const openPost = (_id) => {
    navigate(`../posts/${_id}`, { replace: true });
  };

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

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{ borderRadius: "20px", bgcolor: "rgba(255, 255, 255, 0.7)" }}
        elevation={6}
      >
        <div className={styles.card}>
          <div className={styles.section}>
            <Typography
              sx={{
                fontFamily: "Mulish",
                color: "color.dark",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
              variant="h5"
              component="h2"
            >
              {post.title}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              color="textSecondary"
              component="h2"
            >
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="p"
              color="textSecondary"
            >
              {post.message}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Mulish",
                color: "color.dark",
                fontWeight: "bold",
              }}
              variant="h6"
            >
              Created by: {post.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Mulish",
                color: "color.dark",
              }}
              variant="body1"
            >
              {moment(post.createdAt).fromNow()}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <Typography variant="body1" color="textSecondary">
              <strong>Realtime Chat - coming soon!</strong>
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            {/* <Typography variant="body1" color="textSecondary">
              <strong>Comments - coming soon!</strong>
            </Typography> */}
            <CommentSection post={post} />
            <Divider style={{ margin: "20px 0" }} />
          </div>
          <div className={styles.imageSection}>
            <img
              className={styles.media}
              src={
                post.selectedFile ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt={post.title}
            />
          </div>
        </div>
        {!!recommendedPosts.length && (
          <div className={styles.section}>
            <Typography
              sx={{
                fontFamily: "Mulish",
                color: "color.dark",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
              gutterBottom
              variant="body1"
            >
              You might also like:
            </Typography>
            <Divider />
            <div className={styles.recommendedPosts}>
              {recommendedPosts.map(
                ({ title, name, message, likes, selectedFile, _id }) => (
                  <div
                    style={{ margin: "20px", cursor: "pointer" }}
                    onClick={() => openPost(_id)}
                    key={_id}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Mulish",
                        color: "color.main",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                      gutterBottom
                      variant="h6"
                    >
                      {title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Mulish",
                        color: "color.dark",
                        fontWeight: "bold",
                      }}
                      gutterBottom
                      variant="subtitle2"
                    >
                      {name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      color="textSecondary"
                    >
                      {message}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1">
                      Likes: {likes.length}
                    </Typography>
                    <img src={selectedFile} width="200px" />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default PostDetails;
