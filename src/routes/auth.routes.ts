import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { loginB2C, handleB2CCallback, logout } from '../middleware/auth-handlers.middleware';
import { verifySession } from '../middleware/auth.middleware';

const router: Router = express.Router();
const authController = new AuthController();

// Azure B2C authentication routes
router.get('/login', loginB2C);
router.post('/callback', handleB2CCallback);
router.get('/logout', logout);

// Protected routes
router.get('/profile', verifySession, authController.getProfile);
router.get('/status', verifySession, authController.checkAuthStatus);

// Legacy routes (now redirects to B2C)
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;