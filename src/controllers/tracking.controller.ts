import { Response } from 'express';
import { B2CAuthenticatedRequest } from '../middleware/azureB2C.middleware';
import { updateUserCustomAttribute } from '../services/graph.service';
import { graphApiConfig } from '../config/azure-b2c.config';

export const updateTrackingInfo = async (req: B2CAuthenticatedRequest, res: Response): Promise<void> => {
  const jsonDataToSave = req.body; // The entire JSON body will be saved

  if (!req.user || !req.user.oid) {
    res.status(401).json({ message: 'User not authenticated or user OID missing.' });
    return;
  }

  if (!graphApiConfig.customAttributeName) {
    console.error('B2C_CUSTOM_ATTRIBUTE_NAME is not configured in environment variables.');
    res.status(500).json({ message: 'Server configuration error: Custom attribute name not set.' });
    return;
  }

  try {
    await updateUserCustomAttribute(req.user.oid, graphApiConfig.customAttributeName, jsonDataToSave);
    console.log(`Tracking update for user: ${req.user.oid}, Attribute: ${graphApiConfig.customAttributeName}, Data: ${JSON.stringify(jsonDataToSave)}`);
    res.status(200).json({ 
      message: 'Tracking information updated successfully in user profile.',
      userId: req.user.oid,
      attributeUpdated: graphApiConfig.customAttributeName,
      dataSaved: jsonDataToSave
    });
  } catch (error) {
    console.error('Failed to update user custom attribute:', error);
    res.status(500).json({ message: 'Failed to update tracking information.' });
  }
};
