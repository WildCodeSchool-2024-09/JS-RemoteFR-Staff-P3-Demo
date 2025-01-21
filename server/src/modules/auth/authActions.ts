import argon2 from "argon2";
import type { RequestHandler } from "express";

import authRepository from "./authRepository";

const register: RequestHandler = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashPassword = await argon2.hash(password);

    const datasToRegister = { username, email, hashPassword };

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

export default { register };
