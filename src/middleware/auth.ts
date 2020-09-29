import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No Token' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    decoded.user.id = +decoded.user.id;
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
