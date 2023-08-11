import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreatePostForm.css";

const CreatePostForm = () => {
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!caption.trim()) {
      newErrors.caption = "Caption is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        if (!selectedImage) {
          newErrors.image = "Image is required";
          setErrors(newErrors);
          return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64Image = e.target.result;

          try {
            const response = await axios.post(
              "http://127.0.0.1:8000/api/user/create",
              {
                caption: caption,
                post_image: base64Image,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            console.log("Post created successfully:", response.data);
            navigate("/home");
          } catch (error) {
            console.error("Post creation error:", error);
          }
        };

        reader.readAsDataURL(selectedImage);
      } catch (error) {
        console.error("Error reading image:", error);
      }
    }
  };

  return (
    <div className="create-post-form">
      <div className="form-group">
        <label htmlFor="caption">Caption:</label>
        <input
          type="text"
          name="caption"
          value={caption}
          onChange={handleCaptionChange}
        />
        {errors.caption && (
          <div className="error-message">{errors.caption}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        {errors.image && <div className="error-message">{errors.image}</div>}
      </div>
      <div className="image-preview">
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="preview-image"
          />
        )}
      </div>
      <div className="btn-container">
        <button
          className="submit-button btn"
          type="submit"
          onClick={handleSubmit}
        >
          Create Post
        </button>
        <button
          className="discard-button btn"
          type="button"
          onClick={() => navigate("/Home")}
        >
          Discard
        </button>
      </div>
    </div>
  );
};

export default CreatePostForm;
