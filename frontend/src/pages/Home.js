import PostForm from "../components/PostForm";
import PostData from "../components/PostData";

const Home = () => {
  return (
    <div className="home">
      <div className="posts_">
        <h1>Posts Tracker</h1>
      </div>
      <div className="posts">
        <PostData />
        <PostForm />
      </div>
    </div>
  );
}; 

export default Home;