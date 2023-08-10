import React from "react";
import "./HomePage.css";
import Sidenav from "../../components/Navigation/Sidenav";
import Timeline from "../../components/TimeLine/TimLine";

function Homepage() {
  return (
    <div className="homepage">
      <div className="homepage__navWraper">
        <Sidenav />
      </div>
      <div className="homepage__timeline">
        <Timeline />
      </div>
    </div>
  );
}

export default Homepage;
