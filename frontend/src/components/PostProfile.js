import React, { useState } from "react";
import axios from "axios";
import prof from "../assets/prof.jpeg";

const PostProfile = () => {
  const [file, setFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      console.log("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
    .post("http://localhost:4000/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Server response:", response.data); 
      // Update UI with uploaded image
      if (response.data && response.data.file && response.data.file.filePath) {
        setUploadedImageUrl(response.data.file.filePath);
        console.log("Uploaded image URL:", response.data.file.filePath);
      } else {
        console.log("Image URL not found in the response.");
      }
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
    });
  };

  const userData = JSON.parse(localStorage.getItem("user"));
  const email = userData ? userData.user : "";

  return (
    <div className="profilepic">
     <img src={uploadedImageUrl || prof} alt="profilepic" />
      <h1>Profile</h1>
      <span>{email}</span>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default PostProfile;