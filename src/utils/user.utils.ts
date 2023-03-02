import { User } from "../entities/user.entity";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";
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

//Funcion generar token para restablecer contra
export const updatePasswordResetToken = async (correo: string, resetToken: string, resetTokenExpiry: Date) => {
  await User.update({ correo }, { reset_token: resetToken, reset_token_expiry: resetTokenExpiry });
};

//Funcion para borrar el resetToken
export const clearResetToken = async (idusuario: number): Promise<void> => {
  await User.update({ idusuarios: idusuario }, { reset_token: "", reset_token_expiry: new Date(Date.now()) });
};

//Funcion para enviar correos
export const sendMail = async (mailOptions: any): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response); //debug
    }
  });
};