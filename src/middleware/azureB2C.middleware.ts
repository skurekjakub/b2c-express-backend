import passport from 'passport';
import { Request } from 'express';
import { configurePassportStrategies } from '../config/passport-strategies.config';

/**
 * Define types for user profile data from Azure B2C
 */
export interface UserProfile {
  oid?: string;
  sub?: string;
  emails?: string[];
  name?: string;
  given_name?: string;
  family_name?: string;
  [key: string]: any;
}

/**
 * Extend the Express Request interface
 */
export interface B2CAuthenticatedRequest extends Request {
  user?: UserProfile;
  b2cAuthenticated?: boolean;
}

/**
 * Initialize Passport for Azure B2C authentication
 */
export const initializePassport = (): any => {
  // Configure all passport strategies
  configurePassportStrategies();
  
  // Return the passport initialization middleware
  return passport.initialize();
};