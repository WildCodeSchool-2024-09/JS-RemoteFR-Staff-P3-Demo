import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      login,
    );

    const currentUser = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/auth/find/${result.data.userId}`,
    );

    setUser(currentUser.data);

    setLogin({
      email: "",
      password: "",
    });

    navigate("/");
  };

  return (
    <div id="RegisterContainer">
      <form onSubmit={handleFormSubmit}>
        <input
          id="email"
          name="email"
          type="email"
          value={login.email}
          onChange={handleInputsChange}
          required
        />

        <input
          id="password"
          name="password"
          type="password"
          required
          value={login.password}
          onChange={handleInputsChange}
        />

        <button type="submit">Connexion</button>
      </form>
    </div>
  );
}

export default Login;
