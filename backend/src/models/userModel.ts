import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
    activityHistory?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
        email:{type:String, required: true, unique: true, match:[/^\S+@\S+\.\S+$/, 'el correo no es válido']},
        activityHistory: { type: [String], default: [] },
    },
    {
        timestamps: true, // Habilita createdAt y updatedAt
    }
);

export default mongoose.model<IUser>('User', UserSchema);