import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { User } from '../entities/User.entity';

export class ForgotPasswordService {
  async sendPasswordResetEmail(correo: string) {
    // Comprobar si el usuario existe
    const user = await User.findOneBy({ correo: correo });
    if (!user) {
      throw new Error('Usuario no existe');
    }

    // Crear un token de restablecimiento de contraseña
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hora
    await User.update({ reset_token: resetToken, reset_token_expiry: resetTokenExpiry }, { correo });

    // Enviar el correo electrónico con el token
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: correo,
      subject: 'BaboMart: Link de restablecimiento de contraseña',
      text:
        'Haga clic en el siguiente enlace para restablecer su contraseña: \n\n' +
        `http://localhost:3000/resetpassword/${resetToken} \n\n` +
        'Si no solicitó restablecer su contraseña, ignore este correo electrónico.',
    };
    await transporter.sendMail(mailOptions);
  }
}
