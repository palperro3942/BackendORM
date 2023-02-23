import {User} from '../entities/User.entity';
import { comparePassword } from "../utils/user.utils";

export class LoginService {
    async login(correo: string, contra: string) {   
        // Busca al usuario en la base de datos
        const user = await User.findOneBy({correo: correo});

        // Verifica si el usuario existe y la contraseña es correcta
        if (user && user.contra === contra) {
            return user;
        }
        //if(await comparePassword(contra,user.contra))
        /*
        if (user && await comparePassword(contra,user.contra)) {
            return user;
        }*/
        // Si no se encontró al usuario o la contraseña es incorrecta, se retorna null
        return null;
    }
}
