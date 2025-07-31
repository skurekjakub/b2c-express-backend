import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { UserProfile } from './azureB2C.middleware';
import { createSessionToken } from '../utils/token.utils';
import { azureB2CConfig, AUTH_STRATEGIES } from '../config/azure-b2c.config';

/**
 * Login middleware (redirects to Azure B2C login page)
 */
export const loginB2C = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate(AUTH_STRATEGIES.AZURE_B2C_OIDC, {
    failureRedirect: '/auth/login?error=true',
    session: false,
  })(req, res, next);
};

/**
 * Callback handler for Azure B2C authentication response
 */
export const handleB2CCallback = (req: Request, res: Response): void => {
  passport.authenticate(AUTH_STRATEGIES.AZURE_B2C_OIDC, (err: Error, user: UserProfile) => {
    if (err) {
      console.error('B2C authentication error:', err);
      return res.redirect('/auth/login?error=authentication_failed');
    }
    
    if (!user) {
      console.error('No user returned from B2C authentication');
      return res.redirect('/auth/login?error=no_user');
    }

    try {
      // Create a JWT token for the user session
      const token = createSessionToken(user);

      // Set cookie or return token as appropriate for your application
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000 // 1 hour in milliseconds
      });

      // Redirect to the application home or dashboard
      res.redirect('/');
    } catch (error) {
      console.error('Error creating session token:', error);
      res.redirect('/auth/login?error=token_creation_failed');
    }
  })(req, res);
};

/**
 * Logout handler
 */
export const logout = (req: Request, res: Response): void => {
  res.clearCookie('auth_token');
  
  // Redirect to B2C logout endpoint
  const b2cLogoutUrl = `https://${azureB2CConfig.tenantName}.b2clogin.com/${azureB2CConfig.tenantName}.onmicrosoft.com/${azureB2CConfig.policyName}/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(
    azureB2CConfig.redirectUri.split('/auth/callback')[0]
  )}`;
  
  res.redirect(b2cLogoutUrl);
};
