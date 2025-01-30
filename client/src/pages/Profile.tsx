import { useAuth } from "../contexts/AuthContext";

import axios from "axios";
import defaultProfilePicture from "../assets/images/profil_neutral.webp";

function Profile() {
  const { user, setUser } = useAuth();

  const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/files/upload`,
        formData,
        { withCredentials: true },
      );

      setUser((prev) =>
        prev ? { ...prev, profilePicture: response.data.profilePicPath } : prev,
      );
    } catch (error) {
      console.error("Error uploading the avatar", error);
    }
  };

  return (
    <div id="profile-container">
      <h1>Bonjour {user ? user.username : "inconnu(e)"} :)</h1>

      <section>
        <figure className="profilPicture">
          {user?.profilePicture ? (
            <img
              src={`${import.meta.env.VITE_API_URL}/${user.profilePicture}`}
              alt={user.username}
            />
          ) : (
            <img
              src={defaultProfilePicture}
              alt={user ? user.username : "inconnu"}
            />
          )}
        </figure>

        <div>
          <p>Email : {user ? user.email : "inconnu"}</p>

          <p>Role : {user ? user.role : "inconnu"}</p>
        </div>

        <form encType="multipart/form-data">
          <label htmlFor="avatar">Changez votre photo de profil</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            id="avatar"
            onChange={handleChangeAvatar}
          />
        </form>
      </section>
    </div>
  );
}

export default Profile;
