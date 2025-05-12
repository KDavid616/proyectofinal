import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    try {
        const secretKey = 'your-secret-key'; // Usa tu clave secreta
        const decoded = jwt.verify(token, secretKey) as { userId: string; role: string };
        req.body.userId = decoded.userId;
        req.body.role = decoded.role;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
};

export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.body.role;
        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
        }
        next();
    };
};