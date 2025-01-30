export type {};

declare global {
  namespace Express {
    export interface Request {
      user: JwtPayload & {
        id: number;
        email: string;
        username: string;
        role: string;
      };
    }
  }
}
