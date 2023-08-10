import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import "../styles/LoginPage.css";
import InstagramLogo from "../assets/Instagram_logo_text.png";

const LoginPage = () => {
  return (
    <div className="content">
      <div className="login-container">
        <img src={InstagramLogo} alt="" className="logo" />
        <LoginForm />
      </div>
      <span className="footer">
        Don't have an account?{" "}
        <Link className="link" to={`/signup`}>
          Sign Up
        </Link>
      </span>
    </div>
  );
};

export default LoginPage;
