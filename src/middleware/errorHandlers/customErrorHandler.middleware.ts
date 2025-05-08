import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { sendHtmlOrFallback } from '../../utils/response.utils';

const custom404Handler = (publicDir: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const htmlFileName = req.path.startsWith('/documentation/') ? 
            path.join('documentation', '404.html') :
            '404.html';

        sendHtmlOrFallback(
            res, 
            404, 
            publicDir, 
            htmlFileName, 
            'Content not found', 
            'Error sending 404 page:'
        );
    };
};

export default custom404Handler;
