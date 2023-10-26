import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSessionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : '';

  jwt.verify(token, 'auth-template', (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized. JWT not found in session storage." });
    }

    (req as any).user = user;
    next();
  });
};

export default jwtSessionMiddleware;
