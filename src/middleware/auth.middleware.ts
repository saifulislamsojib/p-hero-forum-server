import checkJWT from '@/utils/checkJWT';
import { RequestHandler } from 'express';

const authCheck: RequestHandler = (req, res, next): void => {
  const token = req.headers.authorization;
  try {
    const auth = checkJWT(token);
    if (auth) {
      req.auth = auth;
      next();
    } else {
      res.status(401).json({ message: 'Invalid token' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authCheck;

export const tokenCheck: RequestHandler = (req, res, next): void => {
  const token = req.headers.authorization;
  if (token && token.startsWith('Bearer ') && token.split(' ')[1]) {
    next();
  } else {
    res.status(201).json({ message: 'Token not found' });
  }
};
