import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

import { isDatabaseError } from "../../helpers/isDatabaseError";

type User = {
  id?: number;
  username: string;
  email: string;
  hashedPassword: string;
  role?: string;
};

class AuthRepository {
  async create(user: User) {
    try {
      const result = await databaseClient.query<Result>(
        `
  INSERT INTO users (username, email, password, role)
  VALUES (?, ?, ?)
  `,
        [user.username, user.email, user.hashedPassword, user.role],
      );

      return { id: result[0].insertId };
    } catch (error: unknown) {
      if (
        isDatabaseError(error) &&
        error.code === "ER_DUP_ENTRY" &&
        error.sqlMessage?.includes("email")
      ) {
        throw new Error("Email already exists");
      }

      throw error;
    }
  }

  async readOneByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT id, email, password, username, role
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [email],
    );

    return rows[0] as User;
  }
}

export default new AuthRepository();
