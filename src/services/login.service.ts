import { User } from '../entities/user.entity';
import { comparePassword, hashPassword } from "../utils/user.utils";

export class LoginService {
  async login(correo: string, contra: string) {
    // Busca al usuario en la base de datos
    const user = await User.findOneBy({ correo });

    // Verifica si el usuario existe y la contraseña es correcta
    if (user && await comparePassword(contra, user.contra)) {
      return user;
    }

    // Si no se encontró al usuario o la contraseña es incorrecta, se retorna null
    return null;
  }
}