import { Request, Response } from 'express';

class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        // Handle user registration logic here
        res.status(201).send({ message: "User registered successfully" });
    }

    async login(req: Request, res: Response): Promise<void> {
        // Handle user login logic here
        res.status(200).send({ message: "User logged in successfully" });
    }
}

export default AuthController;