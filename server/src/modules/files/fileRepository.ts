import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class FileRepository {
  async createProfilePicture(filename: string, path: string, userId: number) {
    const result = await databaseClient.query<Result>(
      `
      INSERT INTO profile_pictures (filename, path, user_id)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE
      filename = ?,
      path = ?
      `,
      [filename, path, userId, filename, path],
    );

    return { id: result[0].insertId };
  }
}

export default new FileRepository();
