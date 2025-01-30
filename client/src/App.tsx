import { Link, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "./contexts/AuthContext";

import "./App.css";

function App() {
  const { user, logOut } = useAuth();

  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>

        {user && (
          <>
            <Link to={`/utilisateurs/${user.username}/profile`}>Profile</Link>
            <button type="button" onClick={handleLogOut}>
              DÉCONNEXION
            </button>
          </>
        )}
      </nav>

      <Outlet />
    </>
  );
}

export default App;
