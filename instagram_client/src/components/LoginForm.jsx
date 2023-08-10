import React, { useState } from "react";
import "../styles/LoginForm.css";
import axios from "axios"; // Import Axios

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/guest/login",
        formData
      );
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-form">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        autoComplete="off"
        placeholder="Email Address"
        id="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        autoComplete="off"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button
        type="button"
        className="submit-login"
        onClick={handleLoginSubmit}
      >
        Log In
      </button>
    </div>
  );
};

export default LoginForm;
