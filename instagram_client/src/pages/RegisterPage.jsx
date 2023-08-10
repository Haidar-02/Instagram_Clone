import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";
import InstagramLogo from "../assets/Instagram_logo_text.png";

const RegisterPage = () => {
  return (
    <div className="content">
      <div className="login-container">
        <img src={InstagramLogo} alt="" className="logo" />
        <RegisterForm />
      </div>
      <span className="footer">
        Already have an account?{" "}
        <Link className="link" to={`/`}>
          Sign In
        </Link>
      </span>
    </div>
  );
};

export default RegisterPage;
