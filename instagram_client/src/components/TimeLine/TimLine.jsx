import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import "./TimeLine.css";
import axios from "axios";

const Timeline = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("");
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="timeline">
      <h2>FEED</h2>
      {posts.map((post, index) => (
        <Post
          key={post.id}
          user={post.user}
          postImage={post.postImage}
          likes={post.likes}
          timestamp={post.timestamp}
        />
      ))}
    </div>
  );
};

export default Timeline;
