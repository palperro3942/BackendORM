import { Request, Response } from "express";
import { LoginService } from '../services/login.service';

export const login = async (req: Request, res: Response) => {
    try {
        const { correo,contra } = req.body; //trae los datos del body
        //Validacion datos de entrada
        if (!correo || !contra) {
        res.status(400).send({ message: 'Falta correo o contraseña' });
        return;
        }
        // Verificar usuario y contraseña
        const loginService = new LoginService();
        const user = await loginService.login(correo, contra);
        if (!user) return res.status(404).json({ message: "Usuario o contraseña son incorrectos" });
        return res.json(user);

    } catch (error) {
        if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
        }
    }
  };