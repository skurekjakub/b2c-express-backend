import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { sendHtmlOrFallback } from '../../utils/response.utils';

const genericErrorHandler = (publicDir: string) => {
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        
        sendHtmlOrFallback(
            res, 
            500, 
            publicDir, 
            '50x.html', 
            'Server Error', 
            'Error sending 50x.html page:'
        );
    };
};

export default genericErrorHandler;
