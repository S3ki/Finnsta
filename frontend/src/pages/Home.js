import PostForm from "../components/PostForm";
import PostData from "../components/PostData";

const Home = () => {
  return (
    <div className="home">
      <div className="posts_">
        <h1>Feed</h1>
      </div>
      <div className="posts">
        <PostForm />
        <PostData />
      </div>
    </div>
  );
}; 

export default Home;