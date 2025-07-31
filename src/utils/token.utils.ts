import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/azure-b2c.config';
import { UserProfile } from '../middleware/azureB2C.middleware';

/**
 * Creates a JWT token for an authenticated user
 * @param user User profile data from Azure B2C
 * @returns JWT token string
 */
export const createSessionToken = (user: UserProfile): string => {
  const payload = { 
    sub: user.sub || user.oid, 
    name: user.name,
    email: user.emails?.[0] || '',
    given_name: user.given_name,
    family_name: user.family_name
  };
  
  return jwt.sign(
    payload,
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn } as jwt.SignOptions
  );
};

/**
 * Verifies a JWT token and returns the decoded payload
 * @param token JWT token to verify
 * @returns Decoded token payload or null if invalid
 */
export const verifyToken = (token: string): UserProfile | null => {
  try {
    return jwt.verify(token, jwtConfig.secret) as UserProfile;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};