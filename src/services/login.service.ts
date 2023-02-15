import {User} from '../entities/user.entity';

export class LoginService {
    async login(correo: string, contra: string) {   
        // Busca al usuario en la base de datos
        const user = await User.findOneBy({correo: correo});

        // Verifica si el usuario existe y la contraseña es correcta
        if (user && user.contra === contra) {
            return user;
        }

        // Si no se encontró al usuario o la contraseña es incorrecta, se retorna null
        return null;
    }
}
