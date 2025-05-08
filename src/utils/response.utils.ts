import path from 'path';
import { Response } from 'express'; // Import Express Response type

/**
 * Attempts to send an HTML file as a response. If sending fails (e.g., file not found),
 * it logs the error and sends a plain text fallback response.
 *
 * @param {Response} res - The Express response object.
 * @param {number} statusCode - The HTTP status code to send.
 * @param {string} publicDir - The absolute path to the public directory.
 * @param {string} htmlFileName - The name of the HTML file (e.g., '404.html') or sub-path within publicDir.
 * @param {string} fallbackText - The plain text to send if the HTML file fails.
 * @param {string} logMessagePrefix - A prefix for console error messages.
 */
const sendHtmlOrFallback = (
    res: Response, 
    statusCode: number, 
    publicDir: string, 
    htmlFileName: string, 
    fallbackText: string, 
    logMessagePrefix: string
): void => {
    const htmlFilePath = path.join(publicDir, htmlFileName);

    res.status(statusCode).sendFile(htmlFilePath, (err: NodeJS.ErrnoException | null) => { // Add type for err
        if (err) {
            console.error(`${logMessagePrefix} '${htmlFilePath}':`, err);
            if (!res.headersSent) {
                res.status(statusCode).send(fallbackText);
            }
        }
    });
};

export { sendHtmlOrFallback }; // ES module export
