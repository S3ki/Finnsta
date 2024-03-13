import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";
const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

  };
  
  const userData = JSON.parse(localStorage.getItem('user'));

  // Extract the email from the JSON data
  const email = userData ? userData.user : '';

  return (
    <header>
      <div className="container">
        <div className="logocont">
        <Link to="/">
          <img src={logo} alt="My logo" />
          <h1>Finnsta</h1>
        </Link>
        </div>
        <nav>
          {isAuthenticated && (
            <div className="logout-prof">
              <span>{email}</span>
              <Link to="/profile">Profile</Link>
              <button onClick={() =>
                {localStorage.removeItem("user");localStorage.removeItem("token");navigate("/login")}}>Log out</button>
            </div>
          )}
          {!isAuthenticated && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;