import React from "react";
import "./HomePage.css";
import Sidenav from "../../components/Navigation/Sidenav";
import Timeline from "../../components/TimeLine/TimLine";
import Search from "../../components/TimeLine/Search/Search";

function Homepage() {
  return (
    <div className="homepage">
      <div className="homepage__navWraper">
        <Sidenav />
      </div>
      <div className="homepage__timeline">
        <Timeline />
      </div>
      <Search />
    </div>
  );
}

export default Homepage;
