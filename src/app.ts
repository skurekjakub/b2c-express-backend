import express, { Express } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

// Import route setters
import setApiRoutes from './routes/index';
import setRedirectRoutes from './routes/redirect.routes';

// Import middleware
import custom404Handler from './middleware/errorHandlers/customErrorHandler.middleware';
import genericErrorHandler from './middleware/errorHandlers/genericErrorHandler.middleware';
import directoryFallbackMiddleware from './middleware/directoryFallback.middleware';
import removeTrailingSlashMiddleware from './middleware/trailingSlash.middleware';
import blacklistMiddleware, { BlacklistPattern } from './middleware/blacklist.middleware';
import { blacklistPatterns } from './constants';
import { initializePassport } from './middleware/azureB2C.middleware';

/**
 * Express application setup
 * =======================
 * This file configures the Express application, sets up the middleware pipeline,
 * and defines the order in which requests flow through the application.
 */

const app: Express = express();
const publicDir: string = path.join(__dirname, '..', 'public');

/**
 * MIDDLEWARE PIPELINE - Order matters!
 * ===================================
 * The order of middleware registration defines the sequence in which
 * requests are processed through the application.
 */

// 1. Body parsing middleware - Handle JSON and form data in request body
app.use(express.json());                              // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));      // Parse URL-encoded form data
app.use(cookieParser());                              // Parse cookies

// 2. Initialize Passport for authentication
app.use(initializePassport());                        // Initialize Azure B2C authentication

// 3. Security middleware - Block access to sensitive files/directories
app.use(blacklistMiddleware(blacklistPatterns));      // Prevents access to blocked paths like /.git

// 4. Request path normalization middleware
app.use(directoryFallbackMiddleware(publicDir));      // Redirect /dir/ to /dir/dir.html if it exists
app.use(removeTrailingSlashMiddleware);               // Remove trailing slashes (e.g., /about/ → /about)

// 5. URL rewriting middleware - Handle Nginx-style redirects
setRedirectRoutes(app);                               // Set up path-based redirects (e.g., /xp/path → /path)

// 6. Static file serving middleware
// This serves files from the public directory with automatic .html extension handling
// If a file doesn't exist, the request continues to the next middleware
app.use(express.static(publicDir, { extensions: ['html'] }));

// 7. API routes registration
// These routes handle dynamic content and API endpoints
setApiRoutes(app);                                    // Set up API routes (/auth/login, /auth/callback, etc.)

// 8. Error handling middleware - Always at the end of the pipeline
app.use(custom404Handler(publicDir));                 // Custom 404 page for unmatched routes
app.use(genericErrorHandler(publicDir));              // 500 error handler for server errors

export default app;