import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller'; // Default import

const router: Router = express.Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router; // ES module export