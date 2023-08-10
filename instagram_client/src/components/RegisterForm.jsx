import React, { useState } from "react";
import "../styles/RegisterForm.css";
import profilePlaceHolder from "../assets/profile.png";

const RegisterForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
    profilePicture: null,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setFormData({
          ...formData,
          profilePicture: e.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (formData.username.trim() === "") {
      newErrors.username = "Username is required";
    } else if (!/^[a-z_.]+$/.test(formData.username)) {
      newErrors.username = "Invalid characters in username";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.fullName.trim() === "") {
      newErrors.fullName = "Full Name is required";
    }

    if (formData.password.length < 7) {
      newErrors.password = "Password must be at least 7 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Perform registration logic here
      console.log(formData);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="reg-content">
      <div className="register_form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          autoComplete="off"
          placeholder="Email Address"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}

        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          name="fullName"
          autoComplete="off"
          placeholder="Full Name"
          id="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
        />
        {errors.fullName && (
          <div className="error-message">{errors.fullName}</div>
        )}

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          autoComplete="off"
          placeholder="Username (lowercase, _, .)"
          value={formData.username}
          onChange={handleInputChange}
        />
        {errors.username && (
          <div className="error-message">{errors.username}</div>
        )}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          autoComplete="off"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && (
          <div className="error-message">{errors.password}</div>
        )}

        <button type="submit" className="submit-reg" onClick={handleSubmit}>
          Register
        </button>
      </div>
      <div className="pp-side">
        <img
          src={selectedImage ? selectedImage : profilePlaceHolder}
          alt=""
          className="profile-logo"
          id="profile-pic-view"
        />
        <div>Upload Profile Picture (Optional)</div>
        <input
          type="file"
          name="profile_picture"
          className="file-input"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default RegisterForm;
