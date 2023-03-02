import { User } from "../entities/user.entity";
import { hashPassword } from "../utils/user.utils";

export class ResetPasswordService {
  async resetPassword(resetToken: string, contra: string) {
    // Busca al usuario por el token de restablecimiento de contraseña
    const user = await User.findOneBy({ reset_token: resetToken });
    if (!user) {
      throw new Error("Token de restablecimiento de contraseña inválido");
    }

    // Verifica que el token no haya expirado
    if (user.reset_token_expiry && user.reset_token_expiry < new Date(Date.now())) {
      throw new Error("Token de restablecimiento de contraseña ha expirado");
    }

    // Encriptar la contraseña
    const hashedPassword = await hashPassword(contra);

    // Actualiza la contraseña del usuario 
    const updatedUser = await User.update(
        { reset_token: resetToken },{ contra: hashedPassword}
    );

    // Si no se pudo actualizar el usuario, lanza un error
    if (!updatedUser.affected || updatedUser.affected < 1) {
      throw new Error("No se pudo actualizar el usuario");
    }

    // Retorna el usuario actualizado
    const updatedUserObj = await User.findOneBy({ reset_token: resetToken });
    return updatedUserObj;
  }
}
