import axios from "axios";
import { useState } from "react";

function Register() {
  const [login, setLogin] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, login);

    setLogin({
      username: "",
      email: "",
      password: "",
    });

    console.info("formulaire posté");
  };

  return (
    <div id="RegisterContainer">
      <form onSubmit={handleFormSubmit}>
        <input
          id="username"
          name="username"
          type="username"
          value={login.username}
          onChange={handleInputsChange}
          required
        />

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

export default Register;
