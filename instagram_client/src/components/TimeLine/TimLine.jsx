import React, { useState } from "react";
import Post from "./Post/Post";
import "./TimeLine.css";

const Timeline = () => {
  const [posts, setPosts] = useState([
    {
      user: "redian_",
      postImage:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      likes: 54,
      timestamp: "2d",
    },
    {
      user: "redian_",
      postImage:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      likes: 54,
      timestamp: "2d",
    },
    {
      user: "redian_",
      postImage:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      likes: 54,
      timestamp: "2d",
    },
    {
      user: "redian_",
      postImage:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      likes: 54,
      timestamp: "2d",
    },
  ]);

  return (
    <div className="timeline">
      <h2>FEED</h2>
      {posts.map((post, index) => (
        <Post
          key={index}
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
