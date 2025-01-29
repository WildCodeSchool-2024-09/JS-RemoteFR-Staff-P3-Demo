import { Link, Outlet } from "react-router-dom";

import { useAuth } from "./contexts/AuthContext";

import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>

        {user && (
          <Link to={`/utilisateurs/${user.username}/profile`}>Profile</Link>
        )}
      </nav>

      <Outlet />
    </>
  );
}

export default App;
