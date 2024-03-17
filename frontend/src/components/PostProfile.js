import { useEffect, useState } from "react";
import axios from "axios";
import prof from "../assets/prof.jpeg";

const PostProfile = () => {

    const [file, setFile] = useState();

    const handleUpload = (e) => { 
        console.log(file);
    }
    const userData = JSON.parse(localStorage.getItem('user'));

  // Extract the email from the JSON data
  const email = userData ? userData.user : '';

    return (
        <div className="profilepic">
            <img src={prof} alt="profilepic" />
            <h1>Profile</h1>
            <span>{email}</span>
            <span>Followers: 20  Following: 2</span>

        <input type="file" onChange={e => setFile(e.target.files[0])}/>
        <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default PostProfile;