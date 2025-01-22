import { useAuth } from "../contexts/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div id="HomeContainer">
      <h1>Home</h1>

      <p>Id : {user ? user.id : "inconnu"}</p>

      <p>Username : {user ? user.username : "inconnu"}</p>

      <p>Email : {user ? user.email : "inconnu"}</p>

      <p>Role : {user ? user.role : "inconnu"}</p>
    </div>
  );
}

export default Home;
