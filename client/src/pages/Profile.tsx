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
    <div id="profile-container">
      <h1>Bonjour {user ? user.username : "inconnu(e)"} :)</h1>

      <section>
        <figure className="profilPicture">
          <img src={profilPicture} alt={user ? user.username : "inconnu"} />
        </figure>

        <div>
          <p>Email : {user ? user.email : "inconnu"}</p>

          <p>Role : {user ? user.role : "inconnu"}</p>

          <p>
            URL de la photo de profil :{" "}
            {user?.profilePicture ? user.profilePicture : "inconnu"}
          </p>
        </div>
      </section>

      <button type="button" onClick={handleLogOut}>
        Déconnexion
      </button>
    </div>
  );
}

export default Profile;
