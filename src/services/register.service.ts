import { User } from '../entities/user.entity';
import { hashPassword, confirmationHash, createJWT } from '../utils/user.utils';
import { sendMail } from "../utils/email.utils";

export class RegisterService {
  async isExistingUser(correo: string): Promise<boolean> {
    // Comprobar si el usuario ya existe en la base de datos
    const existingUser = await User.findOneBy({ correo });
    return !!existingUser;
  }

  async executeRegister(nombre:string, correo: string, contra: string, telefono:string, direccion:string) {
    // Verificar si el correo ya existe
    const userExist = await User.findOneBy({ correo: correo });
    if (userExist) {
      throw new Error('El correo electrónico ya existe');
    }

    // Encriptar la contraseña
    const hashedPassword = await hashPassword(contra);

    // Crear Hash de Confirmacion
    const genConHash = confirmationHash(new Date (Date.now()));

    // Crear nuevo usuario
    const newUser = new User();
    newUser.nombre = nombre;
    newUser.correo = correo;
    newUser.contra = hashedPassword;
    newUser.telefono = telefono;
    newUser.direccion = direccion;
    newUser.confirmationHash= genConHash;

    // Guardar usuario en la base de datos
    await User.save(newUser);

    // Enviamos correo de confirmación
    const confirmationUrl = `https://reprobados.com:3000/register/confirm/${genConHash}`;
    const mailOptions = {
        to: correo,
        subject: "Confirmación de registro en Reprobados.com",
        text: `Haz clic en el enlace para activar tu cuenta: ${confirmationUrl}`,
        html: `<p>Haz clic en el enlace para activar tu cuenta: <a href="${confirmationUrl}">${confirmationUrl}</a></p><p>(¿Hacer clic no funciona? Copia la dirección y pégala en la barra del navegador)</p><p>Esto es un correo automático sobre el uso de reprobados.com. Si no has abierto una cuenta en reprobados.com, puedes ignorar tranquilamente este mensaje.</p>`
    };
    await sendMail(mailOptions);

    // Generar token de autenticación
    const token = createJWT(newUser.idusuarios, newUser.correo);

    return { newUser, token };
  }

  async confirmUserRegistration(confirmationHash: string) {
    const user = await User.findOneBy({ confirmationHash });

    if (!user) {
      throw new Error("No se encontró ningún usuario con el hash de confirmación proporcionado");
    }

    // actualizar campo "active" del usuario a "true" para activar la cuenta
    user.active = true;
    user.confirmationHash = "";
    await User.save(user); //if exists otherwise updates por eso el save

    return user;
  }
}
