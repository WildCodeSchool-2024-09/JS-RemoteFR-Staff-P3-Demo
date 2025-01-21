import argon2 from "argon2";
import jwt from "jsonwebtoken";

type User = {
  id?: number;
  username: string;
  email: string;
  hashedPassword: string;
  role?: string;
};

const passwordsMatch = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await argon2.verify(hash, password);
};

const generateToken = ({ user }: { user: User }) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.TOKEN_SECRET as string,
    {
      expiresIn: "1h",
    },
  );
};

export { passwordsMatch, generateToken };
