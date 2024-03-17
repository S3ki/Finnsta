import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PostUpdate = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("/api/posts", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });
        if (!response.ok) {
          throw new Error(`Failed to fetch post details: ${response.status} ${response.statusText}`);
        }
        const postData = await response.json();
        setTitle(postData.title);
        setText(postData.text);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPost();
  }, [id, token]);

  const handlePutSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = { title, text };

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedPost),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to update post: ${response.status} ${response.statusText}`);
      }

      setTitle("");
      setText("");
      setError(null);
      console.log("Post updated successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h3>Update post</h3>
      <form className="update" onSubmit={handlePutSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Update Post</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default PostUpdate;
