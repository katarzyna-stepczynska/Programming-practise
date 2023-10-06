import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, likePost } from "../../../actions/posts";
import styles from "./Post.module.css";
import "@fontsource/mulish";

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const userId = user?.result.googleId || user?.result?._id;
  const userId = user?.result?._id;

  const handleLikes = () => {
    dispatch(likePost(post._id));
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpOffAltIcon fontSize="small" />
          &nbsp; {post.likes.length}{" "}
          {post.likes.length === 1 ? "Like" : "Likes"} &nbsp;
        </>
      );
    }

    return (
      <>
        <ThumbUpOffAltIcon fontSize="small" />
        &nbsp; Like &nbsp;
      </>
    );
  };

  const openPost = () => {
    navigate(`../posts/${post._id}`, { replace: true });
  };

  return (
    <Card
      sx={{ borderRadius: "20px", bgcolor: "rgba(255, 255, 255, 0.7)" }}
      className={styles.card}
      raised
      elevation={3}
    >
      <CardMedia
        className={styles.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div className={styles.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {
        // user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator && (
          <div className={styles.overlay2} name="edit">
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
            >
              <MoreHorizIcon fontSize="small" />
            </Button>
          </div>
        )
      }
      <div className={styles.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
          fontFamily: "Mulish",
          fontSize: "1em",
          color: "#2e47ad",
          px: "16px",
        }}
        gutterBottom
        variant="h6"
        component="h2"
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          {post.message.split(" ").splice(0, 20).join(" ")}...
        </Typography>
      </CardContent>
      <ButtonBase className={styles.cardAction} onClick={openPost}>
        <Button
          sx={{ mx: 3 }}
          size="medium"
          color="primary"
          variant="outlined"
          fullWidth
        >
          View Post
        </Button>
      </ButtonBase>
      <CardActions className={styles.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLikes}
        >
          <Likes />
        </Button>
        {
          // user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator && (
            <Button
              size="small"
              color="primary"
              onClick={() => {
                dispatch(deletePost(post._id));
              }}
            >
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          )
        }
      </CardActions>
    </Card>
  );
};

export default Post;
