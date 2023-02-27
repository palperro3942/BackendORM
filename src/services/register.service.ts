import { User } from '../entities/user.entity';
import { hashPassword, createJWT } from '../utils/user.utils';

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

    // Crear nuevo usuario
    const newUser = new User();
    newUser.nombre = nombre;
    newUser.correo = correo;
    newUser.contra = hashedPassword;
    newUser.telefono = telefono;
    newUser.direccion = direccion;

    // Guardar usuario en la base de datos
    await User.save(newUser);

    // Generar token de autenticación
    const token = createJWT(newUser.idusuarios, newUser.correo);

    return { newUser, token };
  }
}
