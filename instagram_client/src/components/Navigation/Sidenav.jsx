import React, { useEffect, useState } from "react";
import "./Sidenav.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";
import axios from "axios";

const Sidenav = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userProfilePicture, setUserProfilePicture] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/user/details",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserProfilePicture(response.data.data.profile_picture);
          setUserData(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/user/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Logout successful", response.data);
        localStorage.removeItem("token");
        navigate(`/`);
      } else {
        console.log("No token found in local storage");
      }
    } catch (error) {
      console.log("LOGOUT ERROR:", error);
    }
  };
  return (
    <div className="sidenav">
      <img
        className="sidenav__logo"
        src="https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png"
        alt="Instagram Logo"
      />

      <div className="sidenav__buttons" onClick={() => navigate("/Home")}>
        <button className="sidenav__button">
          <HomeIcon />
          <span>Home</span>
        </button>
        <button className="sidenav__button">
          <SearchIcon />
          <span>Search</span>
        </button>
        <button className="sidenav__button">
          <ExploreIcon />
          <span>Explore</span>
        </button>
        <button className="sidenav__button">
          <SlideshowIcon />
          <span>Reels</span>
        </button>
        <button className="sidenav__button">
          <ChatIcon />
          <span>Messages</span>
        </button>
        <button className="sidenav__button">
          <FavoriteBorderIcon />
          <span>Notifications</span>
        </button>

        <div className="sidenav__button">
          <Avatar src={userProfilePicture}></Avatar>
          <span>
            <button className="logout__button" onClick={handleLogout}>
              Logout
            </button>
          </span>
        </div>
      </div>
      <div className="sidenav__more">
        <button className="sidenav__button">
          <MenuIcon />
          <span className="sidenav__buttonText">More</span>
        </button>
      </div>
    </div>
  );
};

export default Sidenav;
