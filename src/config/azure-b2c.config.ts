import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Strategy identifiers as constants
export const AUTH_STRATEGIES = {
  AZURE_B2C_OIDC: 'azureb2c-oidc',
  BEARER: 'bearer'
};

export const azureB2CConfig = {
  clientID: process.env.B2C_CLIENT_ID || '',
  clientSecret: process.env.B2C_CLIENT_SECRET || '',
  tenantName: process.env.B2C_TENANT_NAME || '',
  policyName: process.env.B2C_POLICY_NAME || 'B2C_1_SignUpSignIn',
  redirectUri: process.env.B2C_REDIRECT_URI || 'http://localhost:3000/auth/callback',
  scope: process.env.B2C_SCOPE?.split(' ') || ['openid', 'profile', 'offline_access'],
  responseType: process.env.B2C_RESPONSE_TYPE || 'code',
  identityMetadata: process.env.B2C_METADATA_ENDPOINT || '',
  allowHttpForRedirectUrl: process.env.NODE_ENV !== 'production',
  responseMode: 'form_post',
  validateIssuer: true,
  passReqToCallback: false,
  loggingLevel: 'info',
  loggingNoPII: true,
};

// JWT config for internal session tokens after B2C authentication
export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your_default_secret',
  expiresIn: '1h'
};