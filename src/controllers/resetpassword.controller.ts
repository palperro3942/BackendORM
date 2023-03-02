import { Request, Response } from "express";
import { ResetPasswordService } from "../services/resetpassword.service";
import { clearResetToken } from "../utils/user.utils";

export const resetPassword = async (req: Request, res: Response) =>{
    const { resetToken } = req.params;
    const { contra } = req.body;
    const resetPasswordService = new ResetPasswordService();

    try {
        //Se llama al servicio para reset password
        const user = await resetPasswordService.resetPassword(resetToken, contra);
        res.status(200).json({ message: "Contraseña actualizada exitosamente", user });
        //Una vez reestablecida se llama a clearResetToken desde user.utils.ts
        if (user?.reset_token) {
            await clearResetToken(user.idusuarios);
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
