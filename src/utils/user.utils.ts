import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config();

// Función para encriptar la contraseña
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Función para comparar la contraseña encriptada con la contraseña proporcionada
export const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

//Crear un JWT
export const createJWT = (id: number, correo: string) => {
    return jwt.sign({ id, correo }, process.env.TOKEN_SECRET ||'default-token', {
        expiresIn: process.env.JWT_EXPIRES_IN||'1h',
    });
};