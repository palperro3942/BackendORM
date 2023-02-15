import { User } from '../entities/user.entity';
import { hashSync } from 'bcrypt';
import { createJWT } from '../utils/user.utils';

export class RegisterService {
  async isExistingUser(correo: string): Promise<boolean> {
    // Comprobar si el usuario ya existe en la base de datos
    const existingUser = await User.findOneBy({ correo });
    return !!existingUser;
  }

  async executeRegister(nombre:string, correo: string, contra: string, telefono:string, direccion:string) {
    const user = new User();
    user.nombre = nombre;
    user.correo = correo;
    user.contra = contra;
    user.telefono = telefono;
    user.direccion = direccion;

    // Verificar si el correo ya existe
    const userExist = await User.findOneBy({ correo: correo });
    if (userExist) {
      throw new Error('El correo electrónico ya existe');
    }

    // Crear nuevo usuario
    const newuser = await User.create({
      nombre,
      correo,
      contra: hashSync(contra, 10),
      telefono,
      direccion,
    });

    // Guardar usuario en la base de datos
    await User.save(newuser);

    // Generar token de autenticación
    const token = createJWT(User.idusuarios, User.correo);

    return { newuser, token };
  }
}
