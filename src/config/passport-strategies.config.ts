import passport from 'passport';
import { BearerStrategy, IOIDCStrategyOptionWithoutRequest, IProfile, OIDCStrategy, VerifyCallback } from 'passport-azure-ad';
import { azureB2CConfig, AUTH_STRATEGIES } from './azure-b2c.config';
import { UserProfile } from '../middleware/azureB2C.middleware';

/**
 * Configures and registers all passport authentication strategies
 */
export const configurePassportStrategies = (): void => {
  // Configure OIDC strategy for authentication
  passport.use(AUTH_STRATEGIES.AZURE_B2C_OIDC, new OIDCStrategy(
    {
      identityMetadata: azureB2CConfig.identityMetadata,
      clientID: azureB2CConfig.clientID,
      responseType: 'code',
      responseMode: 'form_post',
      redirectUrl: azureB2CConfig.redirectUri,
      allowHttpForRedirectUrl: azureB2CConfig.allowHttpForRedirectUrl,
      clientSecret: azureB2CConfig.clientSecret,
      validateIssuer: azureB2CConfig.validateIssuer,
      isB2C: true,
      scope: azureB2CConfig.scope,
      passReqToCallback: false,
      loggingLevel: azureB2CConfig.loggingLevel as any,
      loggingNoPII: azureB2CConfig.loggingNoPII,
    } as IOIDCStrategyOptionWithoutRequest,
    (profile: IProfile, done: VerifyCallback) => {
      // Verify callback function
      console.log('Auth successful for user:', profile.displayName);
      
      // Return the profile to be available in req.user
      return done(null, profile as UserProfile);
    }
  ));

  // Configure Bearer strategy for API authentication
  passport.use(new BearerStrategy(
    {
      identityMetadata: azureB2CConfig.identityMetadata,
      clientID: azureB2CConfig.clientID,
      validateIssuer: azureB2CConfig.validateIssuer,
      isB2C: true,
      loggingLevel: azureB2CConfig.loggingLevel as any,
      loggingNoPII: azureB2CConfig.loggingNoPII,
    },
    (token: any, done: Function) => {
      // Verify token function
      console.log('Token verified for user:', token.name);
      return done(null, token, token);
    }
  ));
};