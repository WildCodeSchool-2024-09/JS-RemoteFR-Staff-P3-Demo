import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Profile() {
  const { user, logOut } = useAuth();

  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  return (
    <div id="ProfileContainer">
      <h1>Profil de {user ? user.username : "inconnu"}</h1>

      <p>Email : {user ? user.email : "inconnu"}</p>

      <p>Role : {user ? user.role : "inconnu"}</p>

      <button type="button" onClick={handleLogOut}>
        Déconnexion
      </button>
    </div>
  );
}

export default Profile;
