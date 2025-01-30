import type { RequestHandler } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

const verifyUser: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Veuillez vous authentifier" });
    return;
  }

  if (!process.env.TOKEN_SECRET) {
    throw new Error("TOKEN_SECRET is not defined");
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET,
    ) as JwtPayload;

    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};

export { verifyUser };
