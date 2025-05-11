import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { graphApiConfig } from '../config/azure-b2c.config';
import 'isomorphic-fetch'; // Required for the Graph SDK to work in Node.js

if (!graphApiConfig.clientId || !graphApiConfig.clientSecret || !graphApiConfig.tenantId) {
  throw new Error('Graph API client ID, client secret, or tenant ID is not configured. Check your .env file.');
}

if (!graphApiConfig.customAttributeName) {
    console.warn('B2C_CUSTOM_ATTRIBUTE_NAME is not set in .env. User custom attribute updates will fail.');
}

const credential = new ClientSecretCredential(
  graphApiConfig.tenantId,
  graphApiConfig.clientId,
  graphApiConfig.clientSecret
);

const graphClient = Client.initWithMiddleware({
  authProvider: {
    getAccessToken: async () => {
      const tokenResponse = await credential.getToken('https://graph.microsoft.com/.default');
      if (!tokenResponse || !tokenResponse.token) {
        throw new Error('Failed to retrieve access token for Graph API.');
      }
      return tokenResponse.token;
    },
  },
});

/**
 * Updates a custom attribute for a given user in Azure AD B2C.
 * @param userId - The Object ID (oid) of the user.
 * @param attributeName - The full name of the custom attribute (e.g., 'extension_yourAppId_customFieldName').
 * @param attributeValue - The value to set for the custom attribute.
 */
export const updateUserCustomAttribute = async (userId: string, attributeName: string, attributeValue: any): Promise<void> => {
  if (!attributeName) {
    throw new Error('Custom attribute name is not defined. Cannot update user attribute.');
  }
  if (!userId) {
    throw new Error('User ID is not defined. Cannot update user attribute.');
  }

  const userUpdate = {
    [attributeName]: attributeValue,
  };

  try {
    await graphClient.api(`/users/${userId}`).update(userUpdate);
    console.log(`Successfully updated custom attribute '${attributeName}' for user '${userId}'.`);
  } catch (error) {
    console.error(`Error updating custom attribute '${attributeName}' for user '${userId}':`, error);
    // Consider re-throwing or handling specific error types
    throw new Error('Failed to update user custom attribute via Graph API.');
  }
};
