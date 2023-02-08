import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const forgotPassword = async (pool, req, res) => {
  try {
    const { email } = req.body;
    //Comprobar si el usuario existe
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) return res.status(400).send('Usuario no existe');
    //Crear un token de restablecimiento de contraseña
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; //1 hora
    await pool.query('UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?', [resetToken, resetTokenExpiry, email]);
    //Enviar el correo electrónico con el token
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'BaboMart: Link de restablecimiento de contraseña',
        text:
          'Haga clic en el siguiente enlace para restablecer su contraseña: \n\n' +
          `http://localhost:3000/resetpassword/${resetToken} \n\n` +
          'Si no solicitó restablecer su contraseña, ignore este correo electrónico.',
      };
      await transporter.sendMail(mailOptions);
      res.status(200).send('Se ha enviado un correo electrónico para restablecer su contraseña');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor');
    }
  };
  
