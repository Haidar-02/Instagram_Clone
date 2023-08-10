import React from "react";
import "../styles/LoginForm.css";

const LoginForm = () => {
  return (
    <div className="login-form">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        autoComplete="off"
        placeholder="Email Adress"
        id="email"
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        name="password"
        autoComplete="off"
        placeholder="Password"
      />
      {/* perform login action */}
      <button type="submit" className="submit-login">
        Log In
      </button>
    </div>
  );
};

export default LoginForm;
