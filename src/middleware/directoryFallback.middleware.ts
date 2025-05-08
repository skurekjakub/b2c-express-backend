import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

const directoryFallbackMiddleware = (publicDir: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Only act on directory requests (ending with a slash, and not just "/")
        if (req.path.endsWith('/') && req.path.length > 1) {
            // Get the directory name from the path. E.g., "foo/bar/" -> "bar", "foo/" -> "foo"
            const pathWithoutTrailingSlash = req.path.slice(0, -1);
            const directoryName = path.basename(pathWithoutTrailingSlash);

            if (directoryName) {
                // Construct the full file system path to the potential HTML file
                // e.g., for /products/, check for publicDir/products/products.html
                const potentialFileName = directoryName + '.html';
                const fullDiskPath = path.join(publicDir, req.path, potentialFileName);

                // Construct the URL for redirection (should use forward slashes)
                // e.g., /products/products.html
                const redirectUrl = path.posix.join(req.path, potentialFileName);

                if (fs.existsSync(fullDiskPath)) {
                    const query = req.url.slice(req.path.length); // Preserve query string
                    return res.redirect(301, redirectUrl + query);
                }
            }
        }
        next(); // Proceed to next middleware
    };
};

export default directoryFallbackMiddleware;
