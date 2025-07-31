import { Request, Response } from 'express';
import { B2CAuthenticatedRequest } from '../middleware/azureB2C.middleware';

class AuthController {
    // Method to handle user profile information
    async getProfile(req: B2CAuthenticatedRequest, res: Response): Promise<void> {
        if (!req.user) {
            res.status(401).json({ message: "Not authenticated" });
            return;
        }

        // Return user profile information from Azure B2C
        res.status(200).json({
            id: req.user.sub || req.user.oid,
            name: req.user.name,
            email: req.user.emails?.[0] || null,
            given_name: req.user.given_name,
            family_name: req.user.family_name
        });
    }

    // Check authentication status
    async checkAuthStatus(req: B2CAuthenticatedRequest, res: Response): Promise<void> {
        if (req.b2cAuthenticated && req.user) {
            res.status(200).json({ 
                authenticated: true,
                name: req.user.name
            });
        } else {
            res.status(200).json({ authenticated: false });
        }
    }
    
    // Legacy methods kept for backwards compatibility
    async register(req: Request, res: Response): Promise<void> {
        // Redirect to B2C sign-up flow
        res.redirect('/auth/login');
    }

    async login(req: Request, res: Response): Promise<void> {
        // This function is now just a placeholder
        // The actual login is handled by the B2C middleware
        res.status(200).send({ message: "Use /auth/login endpoint for B2C authentication" });
    }
}

export default AuthController;