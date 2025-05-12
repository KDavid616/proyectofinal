import express from 'express';
import UserController from '../controllers/userController';
import { verifyToken, authorizeRoles } from '../middlewares/authMiddleware';

const router = express.Router();
const userController = new UserController();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile/:id', userController.getProfile);
router.put('/profile/:id', userController.updateProfile);
router.get('/history/:id', userController.getUserHistory);
router.get('/', verifyToken, authorizeRoles('Admin', 'Editor', 'Viewer'), userController.getAllUsers); // Todos los roles pueden ver usuarios
router.put('/:id/role', verifyToken, authorizeRoles('Admin', 'Editor'), userController.updateUserRole); // Solo Admin y Editor pueden cambiar roles
router.post('/', verifyToken, authorizeRoles('Admin'), userController.register); // Solo Admin puede registrar usuarios
router.delete('/:id', verifyToken, authorizeRoles('Admin'), userController.deleteUser); // Solo Admin puede eliminar usuarios
router.get('/test', userController.testConnection);

export default router;