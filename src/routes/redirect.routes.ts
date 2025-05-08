import { Express, Request, Response } from 'express';

// Helper to preserve query string
const preserveQueryString = (req: Request): string => {
    const queryIndex = req.url.indexOf('?');
    if (queryIndex !== -1) {
        return req.url.substring(queryIndex);
    }
    return '';
};

// Helper to extract the rest of the path after a prefix
const getPathAfterPrefix = (fullPath: string, prefix: string): string => {
    return fullPath.substring(prefix.length);
};

const setRedirectRoutes = (app: Express) => {
    // Redirect version/collection roots
    app.get('/xp', (req: Request, res: Response) => {
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
    // Using a more generic approach without the problematic :rest(*) syntax
    app.use('/xp/', (req: Request, res: Response) => {
        const restOfPath = getPathAfterPrefix(req.path, '/xp/');
        res.redirect(301, `/${restOfPath}${preserveQueryString(req)}`);
    });
    
    app.use('/k12/', (req: Request, res: Response) => {
        const restOfPath = getPathAfterPrefix(req.path, '/k12/');
        res.redirect(301, `/k12sp/${restOfPath}${preserveQueryString(req)}`);
    });
    
    app.use('/k12tutorial/', (req: Request, res: Response) => {
        const restOfPath = getPathAfterPrefix(req.path, '/k12tutorial/');
        res.redirect(301, `/k12sptutorial/${restOfPath}${preserveQueryString(req)}`);
    });
    
    app.use('/api12/', (req: Request, res: Response) => {
        const restOfPath = getPathAfterPrefix(req.path, '/api12/');
        res.redirect(301, `/api12sp/${restOfPath}${preserveQueryString(req)}`);
    });
};

export default setRedirectRoutes;
