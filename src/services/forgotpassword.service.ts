import crypto from 'crypto';
import { User } from '../entities/user.entity';
import { updatePasswordResetToken, sendMail  } from '../utils/user.utils';

export class ForgotPasswordService {
  async sendPasswordResetEmail(correo: string) {
    // Comprobar si el usuario existe
    const user = await User.findOneBy({ correo: correo });
    if (!user) {
      throw new Error('Usuario no existe');
    }

    // Crear un token de restablecimiento de contraseña
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + (60 * 60 * 1000)); // 1 hora en milisegundos
    await updatePasswordResetToken(user.correo, resetToken, resetTokenExpiry);

    // Enviar el correo electrónico con el token
    const mailOptions = {
      from: process.env.EMAIL,
      to: correo,
      subject: 'reprobados.com: Link de restablecimiento de contraseña',
      text:
        'Haga clic en el siguiente enlace para restablecer su contraseña: \n\n' +
        `http://localhost:3000/resetpassword/${resetToken} \n\n` +
        'Si no solicitó restablecer su contraseña, ignore este correo electrónico.',
    };
    await sendMail(mailOptions);
  }
}
