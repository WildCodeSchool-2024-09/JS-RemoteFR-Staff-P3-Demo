import databaseClient from "../../../database/client";
import type { Result } from "../../../database/client";

import { isDatabaseError } from "../../helpers/isDatabaseError";

type User = {
  username: string;
  email: string;
  hashPassword: string;
};

class AuthRepository {
  async create(user: User) {
    try {
      const result = await databaseClient.query<Result>(
        `
  INSERT INTO users (username, email, password)
  VALUES (?, ?, ?)
  `,
        [user.username, user.email, user.hashPassword],
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
}
export default new AuthRepository();
