import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Register() {
  const [login, setLogin] = useState({
    username: "",
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

    const newUser = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      login,
    );

    const currentUser = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/auth/find/${newUser.data.userId}`,
    );

    setUser(currentUser.data);

    setLogin({
      username: "",
      email: "",
      password: "",
    });

    navigate("/");
  };

  return (
    <div id="register-container">
      <h1>Register</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          id="username"
          name="username"
          type="username"
          placeholder="username"
          value={login.username}
          onChange={handleInputsChange}
          required
        />

        <input
          id="email"
          name="email"
          type="email"
          placeholder="email"
          value={login.email}
          onChange={handleInputsChange}
          required
        />

        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          required
          value={login.password}
          onChange={handleInputsChange}
        />

        <button type="submit">S'enregistrer</button>
      </form>
    </div>
  );
}

export default Register;
