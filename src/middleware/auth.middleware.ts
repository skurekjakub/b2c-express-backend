import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { B2CAuthenticatedRequest, UserProfile } from './azureB2C.middleware';
import { verifyToken } from '../utils/token.utils';

/**
 * Middleware to verify JWT tokens for protected routes
 */
export const verifySession = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.auth_token || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }
  
  const decoded = verifyToken(token);
  
  if (!decoded) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }
  
  (req as B2CAuthenticatedRequest).user = decoded;
  (req as B2CAuthenticatedRequest).b2cAuthenticated = true;
  next();
};

/**
 * API authentication middleware using Passport Bearer strategy
 */
export const authenticateAPI = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('bearer', { session: false }, (err: Error, user: UserProfile) => {
    if (err) {
      res.status(401).json({ message: 'Authentication error' });
      return;
    }
    if (!user) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
    (req as B2CAuthenticatedRequest).user = user;
    (req as B2CAuthenticatedRequest).b2cAuthenticated = true;
    next();
  })(req, res, next);
};

/**
 * Middleware to check if user is authenticated
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  if ((req as B2CAuthenticatedRequest).b2cAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: 'Authentication required' });
  }
};