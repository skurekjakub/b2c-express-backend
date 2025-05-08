import express, { Express } from 'express';
import path from 'path';

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

// 2. Security middleware - Block access to sensitive files/directories
app.use(blacklistMiddleware(blacklistPatterns));      // Prevents access to blocked paths like /.git

// 3. Request path normalization middleware
app.use(directoryFallbackMiddleware(publicDir));      // Redirect /dir/ to /dir/dir.html if it exists
app.use(removeTrailingSlashMiddleware);               // Remove trailing slashes (e.g., /about/ → /about)

// 4. URL rewriting middleware - Handle Nginx-style redirects
setRedirectRoutes(app);                               // Set up path-based redirects (e.g., /xp/path → /path)

// 5. Static file serving middleware
// This serves files from the public directory with automatic .html extension handling
// If a file doesn't exist, the request continues to the next middleware
app.use(express.static(publicDir, { extensions: ['html'] }));

// 6. API routes registration
// These routes handle dynamic content and API endpoints
setApiRoutes(app);                                    // Set up API routes (/auth/register, /auth/login)

// 7. Error handling middleware - Always at the end of the pipeline
app.use(custom404Handler(publicDir));                 // Custom 404 page for unmatched routes
app.use(genericErrorHandler(publicDir));              // 500 error handler for server errors

/**
 * Request Processing Flow:
 * 1. Parse request body if present
 * 2. Check if path is blacklisted (e.g., /.git) - return 403 if matched
 * 3. Check if directory URL should redirect to directory-named HTML file
 * 4. Remove trailing slashes from URLs
 * 5. Apply any configured redirects based on URL patterns
 * 6. Try to serve a static file from public directory
 * 7. Route to API endpoints if path matches
 * 8. If no route matched, serve 404 page
 * 9. If any error occurred, serve 500 page
 */

export default app;