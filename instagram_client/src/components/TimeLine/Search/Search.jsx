import React, { useState } from "react";
import "./Search.css";
import { Avatar } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchUsername, setSearchUsername] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/user/search`,
        {
          username: searchUsername,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status === "Success") {
        setSearchResult(response.data.data);
        setError(null);
      } else if (response.status === "User not found") {
        setSearchResult(null);
        setError("User not found");
      } else {
        setError("An error occurred while searching");
      }
    } catch (error) {
      console.error("Error searching users:", error);
      setError("User Not Found");
    }
  };

  const handleFollow = async (userId) => {
    try {
      const formData = new FormData();
      formData.append("user_id", userId);

      const response = await axios.post(
        `http://127.0.0.1:8000/api/user/follow`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsFollowing(true);
      window.location.reload();
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <div className="Search__Container">
      <strong>Search for users to follow</strong>
      <div>
        <input
          type="text"
          name="username"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
          autoComplete="off"
        />
        <button className="btn search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="result">
        {error ? (
          <div className="error">{error}</div>
        ) : (
          searchResult && (
            <div className="user-info" key={searchResult.id}>
              <Avatar
                src={searchResult.profile_picture || "default-avatar.jpg"}
              ></Avatar>
              <strong>{searchResult.username}</strong>
              <button
                className="btn follow-btn"
                onClick={() => handleFollow(searchResult.id)}
                disabled={isFollowing}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Search;
