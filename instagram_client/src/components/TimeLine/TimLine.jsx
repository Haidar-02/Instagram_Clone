import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import "./TimeLine.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Timeline = (fetchPosts) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          "http://127.0.0.1:8000/api/user/posts",
          { headers }
        );
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="timeline">
      <div className="header">
        <h2>FEED</h2>
        <button className="sidenav__button" onClick={() => navigate("/Create")}>
          <AddCircleOutlineIcon />
          <span>Create</span>
        </button>
      </div>

      {posts.map((post) => (
        <Post
          key={post.id}
          post_id={post.id}
          user={post.user}
          postImage={post.post_image}
          initialLikes={post.likes_count}
          is_liked={post.is_liked}
          timestamp={post.created_at}
          fetchPosts={fetchPosts}
        />
      ))}
    </div>
  );
};

export default Timeline;
