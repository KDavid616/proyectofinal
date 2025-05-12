import { Request, Response } from 'express';
import User from '../models/userModel';
import authService from '../services/authService'; // Importa la instancia exportada

class UserController {
    constructor() {
        // No necesitas inicializar authService aquí porque ya es una instancia
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, password, role } = req.body;
            console.log('Datos recibidos:', { username, email, password, role });

            if (!username || !email || !password || !role) {
                console.log('Faltan campos obligatorios');
                res.status(400).json({ message: 'Todos los campos son obligatorios' });
                return;
            }

            const newUser = await authService.registerUser(username,email, password, role);
            console.log('Usuario registrado:', newUser);

            res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ message: 'Error al registrar usuario', error });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            console.log('Intentando iniciar sesión con:', username);

            // Usa el método loginUser de authService
            const { token, user } = await authService.loginUser(username, password);

            console.log('Inicio de sesión exitoso, token generado:', token);

            res.status(200).json({ token, user });
        } catch (error) {
            const err = error as Error;
            console.error('Error en el login:', err.message);
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    }

    public async updateProfile(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const updates = req.body;
            const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Error updating profile', error });
        }
    }

    public async getUserHistory(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user.activityHistory);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user history', error });
        }
    }

    public async getProfile(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving profile', error });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params; // Obtén el ID del usuario desde los parámetros de la URL
            const deletedUser = await User.findByIdAndDelete(id); // Elimina el usuario por ID
            if (!deletedUser) {
                res.status(404).json({ message: 'Usuario no encontrado' });
                return;
            }
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({ message: 'Error al eliminar usuario', error });
        }
    }

    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.find(); // Obtiene todos los usuarios de la base de datos
            res.status(200).json(users); // Devuelve los usuarios en formato JSON
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Error al obtener usuarios', error });
        }
    }

    public async testConnection(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error connecting to database', error });
        }
    }

    public async updateUserRole(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params; // Obtén el ID del usuario desde los parámetros de la URL
            const { role } = req.body; // Obtén el nuevo rol desde el cuerpo de la solicitud

            // Verifica que el rol esté presente
            if (!role) {
                res.status(400).json({ message: 'El campo "role" es obligatorio' });
                return;
            }

            // Actualiza el rol del usuario
            const updatedUser = await User.findByIdAndUpdate(
                id,
                { role },
                { new: true } // Devuelve el usuario actualizado
            );

            if (!updatedUser) {
                res.status(404).json({ message: 'Usuario no encontrado' });
                return;
            }

            res.status(200).json({ message: 'Rol actualizado exitosamente', user: updatedUser });
        } catch (error) {
            console.error('Error al actualizar el rol del usuario:', error);
            res.status(500).json({ message: 'Error al actualizar el rol del usuario', error });
        }
    }
}

export default UserController;