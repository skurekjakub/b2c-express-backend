import { Request, Response, NextFunction, RequestHandler } from 'express';

export type BlacklistPattern = string | RegExp;

const blacklistMiddleware = (blacklistPatterns: BlacklistPattern[]): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        for (const pattern of blacklistPatterns) {
            if (typeof pattern === 'string' && req.path.includes(pattern)) {
                res.status(403).send('Forbidden');
                return; // Use return without value instead of returning the response
            }
            else if (pattern instanceof RegExp && pattern.test(req.path)) {
                res.status(403).send('Forbidden');
                return; // Use return without value instead of returning the response
            }
        }
        next();
    };
};

export default blacklistMiddleware;
