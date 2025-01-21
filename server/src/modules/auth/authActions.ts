import argon2 from "argon2";
import type { RequestHandler } from "express";

import { generateToken, passwordsMatch } from "../../helpers/authTools";
import authRepository from "./authRepository";

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authRepository.readOneByEmail(email);

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    if (!user.hashedPassword) {
      throw new Error("Password field is missing in user object.");
    }

    const isPasswordValid = await passwordsMatch(password, user.hashedPassword);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateToken({ user });

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .status(200)
      .json({ message: "Connexion réussie" });
  } catch (error) {
    console.error("Unexpected error: ", error);
    res.status(500).json({ message: "An unexpected error occurred" });
    return;
  }
};

const register: RequestHandler = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await argon2.hash(password);

    const datasToRegister = { username, email, hashedPassword };

    const registeredUser = await authRepository.create(datasToRegister);

    res.status(201).json({
      id: registeredUser.id,
      message: "Utilisateur correctement créé",
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Email already exists") {
      res.status(409).json({ message: "This email is already taken" });
    } else {
      console.error("Unexpected error: ", error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export default { login, register };
