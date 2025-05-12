import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_URI!;
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully ✅');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Salir del proceso si no se puede conectar
    }
};

export default connectDB;