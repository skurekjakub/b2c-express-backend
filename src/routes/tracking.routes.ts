import { Router } from 'express';
import { updateTrackingInfo } from '../controllers/tracking.controller';
import { verifySession } from '../middleware/auth.middleware';

const router = Router();

// Route to update tracking information
// Protected by verifySession middleware
router.post('/update-tracking', verifySession, updateTrackingInfo);

export default router;
