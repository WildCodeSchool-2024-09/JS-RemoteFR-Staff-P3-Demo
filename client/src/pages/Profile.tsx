import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import profilPicture from "../assets/images/profil_neutral.webp";

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

      <img src={profilPicture} alt={user ? user.username : "inconnu"} />

      <p>Email : {user ? user.email : "inconnu"}</p>

      <p>Role : {user ? user.role : "inconnu"}</p>

      <button type="button" onClick={handleLogOut}>
        Déconnexion
      </button>
    </div>
  );
}

export default Profile;
