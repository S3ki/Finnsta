import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PostData = () => {
    const [postsList, setPostsList] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        if (!token) {
          // If no token return
          return;
        }
  
        const response = await fetch("/api/posts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const json = await response.json();
          setPostsList(json);
        } else {
          // Handle error
        }
      };
      fetchData();
    }, [token]);
  
    const handleDelete = async (id) => {
      if (!token) {
        // Handle the case where the user is not logged in
        return;
      }
  
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        setPostsList(postsList.filter((posts) => posts.id !== id));
        window.location.reload();
      } else {
        console.log("error", id);
      }
      navigate("/");
    };
  
    // This is the return statement
    return (
      <div>
        <ul className="postslist">
          {postsList.map((posts) => (
            <li key={posts._id}>
              <strong>{posts.title}</strong> 
              <br />
              <span>{posts.text}</span>
              <br />
              <button onClick={() => handleDelete(posts._id)}>Delete</button>
              <br />
            </li>
          ))}
        </ul>
      </div>
    );
};

export default PostData;