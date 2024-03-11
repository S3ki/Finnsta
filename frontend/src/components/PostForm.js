import { useState } from "react";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
  

    if (!token) {
      setError("You must be logged in");
      return;
    }

    const posts = { title, text };

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(posts),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setText("");
      setError(null);

      console.log(json, "success");
      
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New post</h3>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>text:</label>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <button>Add Post</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default PostForm;