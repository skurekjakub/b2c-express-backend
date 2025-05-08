import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define a type for the decoded user ID
interface DecodedToken {
    id: string; // Or number, depending on your user ID type
}

// Extend the Express Request interface to include userId
interface AuthenticatedRequest extends Request {
    userId?: string; // Or number
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret'; // Use environment variable or a default

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        // Type assertion for decoded object
        req.userId = (decoded as DecodedToken).id;
        next();
    });
};

export { verifyToken };