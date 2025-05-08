import { Request, Response, NextFunction } from 'express';

const removeTrailingSlashMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.path.length > 1 && req.path.endsWith('/')) {
        const query = req.url.slice(req.path.length);
        const newPath = req.path.slice(0, -1);
        return res.redirect(301, newPath + query);
    }
    next();
};

export default removeTrailingSlashMiddleware;
