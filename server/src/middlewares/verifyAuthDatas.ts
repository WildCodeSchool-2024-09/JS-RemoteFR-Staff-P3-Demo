import type { NextFunction, Request, Response } from "express";
import Joi from "joi";

interface AuthRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

const verifyAuthDatas = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export default { verifyAuthDatas };
