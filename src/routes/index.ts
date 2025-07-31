import { Express } from 'express'; // Import Express type
import authRoutes from './auth.routes'; // Default import
import trackingRoutes from './tracking.routes'; // Import tracking routes

// Define main application routes
const setApiRoutes = (app: Express) => { // Add type for app
    // Mount the auth router under /auth
    app.use('/auth', authRoutes);
    // Mount the tracking router under /portal-api
    app.use('/portal-api', trackingRoutes);
    
    // Other API routes can be added here, for example:
    // import otherRouter from './other.routes';
    // app.use('/other', otherRouter);
};

export default setApiRoutes; // ES module export