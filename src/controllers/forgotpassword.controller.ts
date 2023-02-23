import { Request, Response } from "express";
import { ForgotPasswordService } from "../services/forgotpassword.service";

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { correo } = req.body;

    const forgotPasswordService = new ForgotPasswordService();
    const result = await forgotPasswordService.sendPasswordResetEmail(correo);

    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
