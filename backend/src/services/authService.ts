import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

class AuthService {
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    public async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    public generateToken(userId: string, username: string, role: string): string {
        const secretKey = 'your-secret-key'; // Cambia esto por tu clave secreta
        return jwt.sign({ userId, username, role }, secretKey, { expiresIn: '1h' });
    }

    async registerUser(username: string, email: string, password: string, role: string) {
        console.log('Datos que se pasarán al modelo:', { username, email, password, role });

        // Encripta la contraseña
        const hashedPassword = await this.hashPassword(password);

        // Crea un nuevo usuario
        const newUser = new User({ username, email, password: hashedPassword, role });
        return await newUser.save();
    }

    async loginUser(username: string, password: string) {
        const user = await User.findOne({ username }) as IUser | null;
        if (user && await this.validatePassword(password, user.password)) {
            const token = this.generateToken((user._id as unknown as string), user.username, user.role as string); // Ensure _id is treated as a string
            return { token, user };
        }
        throw new Error('Invalid credentials');
    }
}

export default new AuthService();