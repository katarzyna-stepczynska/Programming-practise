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
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import styles from "./Post.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, likePost } from "../../../actions/posts";
import "@fontsource/mulish";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; {post.likes.length}{" "}
          {post.likes.length === 1 ? "Like" : "Likes"} &nbsp;
        </>
      );
    }
    return (
      <>
        <ThumbUpAltIcon fontSize="small" />
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
      <ButtonBase className={styles.cardAction} onClick={openPost}>
        View more
      </ButtonBase>

      <CardMedia
        className={styles.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={styles.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {user?.result?.googleId === post?.creator ||
        (user?.result?._id === post?.creator && (
          <div className={styles.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => setCurrentId(post._id)}
            >
              <MoreHorizIcon fontSize="small" />
            </Button>
          </div>
        ))}
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
          {post.message}
        </Typography>
      </CardContent>
      {/* </ButtonBase> */}
      <CardActions className={styles.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <Likes />
        </Button>
        {user?.result?.googleId === post?.creator ||
          (user?.result?._id === post?.creator && (
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
          ))}
      </CardActions>
    </Card>
  );
};

export default Post;
