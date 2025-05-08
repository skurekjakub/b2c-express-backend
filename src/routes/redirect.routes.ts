import { Express, Request, Response } from 'express'; // Import Express types

// Helper to preserve query string
const preserveQueryString = (req: Request): string => { // Add types for req and return value
    const queryIndex = req.url.indexOf('?');
    if (queryIndex !== -1) {
        return req.url.substring(queryIndex);
    }
    return '';
};

const setRedirectRoutes = (app: Express) => { // Add type for app
    // Redirect version/collection roots
    app.get('/xp', (req: Request, res: Response) => { // Add types for req and res
        res.redirect(301, `/${preserveQueryString(req)}`);
    });
    app.get('/k12', (req: Request, res: Response) => {
        res.redirect(301, `/k12sp${preserveQueryString(req)}`);
    });
    app.get('/k12tutorial', (req: Request, res: Response) => {
        res.redirect(301, `/k12sptutorial${preserveQueryString(req)}`);
    });
    app.get('/api12', (req: Request, res: Response) => {
        res.redirect(301, `/api12sp${preserveQueryString(req)}`);
    });

    // Redirect paths (e.g., /xp/path to /path)
    app.get('/xp/:rest(*)', (req: Request, res: Response) => {
        const rest = req.params.rest;
        res.redirect(301, `/${rest}${preserveQueryString(req)}`);
    });
    app.get('/k12/:rest(*)', (req: Request, res: Response) => {
        const rest = req.params.rest;
        res.redirect(301, `/k12sp/${rest}${preserveQueryString(req)}`);
    });
    app.get('/k12tutorial/:rest(*)', (req: Request, res: Response) => {
        const rest = req.params.rest;
        res.redirect(301, `/k12sptutorial/${rest}${preserveQueryString(req)}`);
    });
    app.get('/api12/:rest(*)', (req: Request, res: Response) => {
        const rest = req.params.rest;
        res.redirect(301, `/api12sp/${rest}${preserveQueryString(req)}`);
    });
};

export default setRedirectRoutes; // ES module export
