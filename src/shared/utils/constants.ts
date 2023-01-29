import { Secret } from 'jsonwebtoken';
export const PORT = Number(process.env.PORT) || 3001;
export const JWT_SECRET = process.env.JWT_SECRET as Secret;