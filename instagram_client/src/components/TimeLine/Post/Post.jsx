import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar } from "@mui/material";
import "./Post.css";
import FavoriteBorderIcon from "@mui/icons-material/Favorite";
import axios from "axios";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const Post = ({
  post_id,
  user,
  postImage,
  initialLikes,
  is_liked,
  timestamp,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(is_liked);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/user/like`,
        {
          post_id: post_id,
          user_id: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const newLikes = response.data.likes;
      setLikes(newLikes);
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const formattedDate = new Date(timestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__headerAuthor">
          <Avatar style={{ marginRight: "10px" }} src={user.profile_picture} />
          {user.username} • <span>{formattedDate}</span>
        </div>
        <MoreHorizIcon />
      </div>
      <div className="post__image">
        <img src={postImage} alt="Post" />
      </div>
      <div className="post__footer">
        <div className="post__footerIcons">
          <div className="post__iconsMain" onClick={handleLike}>
            <FavoriteBorderIcon
              className={`postIcon ${
                is_liked ? "LikedIcon" : "FavoriteBorderIcon"
              }`}
              style={{ color: liked ? "red" : "white" }}
            />
          </div>
          <div className="post__iconSave">
            <BookmarkBorderIcon className="postIcon" />
          </div>
        </div>
        Liked by <strong>{likes} people</strong>
      </div>
    </div>
  );
};
export default Post;
