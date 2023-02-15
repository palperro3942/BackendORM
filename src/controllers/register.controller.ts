import { Request, Response } from "express";
import { RegisterService } from '../services/register.service';

interface UserBody {
    nombre: string;
    correo: string;
    contra: string;
    telefono: string;
    direccion: string;
  }

export const register = async (req: Request, res: Response) => {
    try {
        const { nombre, correo, contra, telefono, direccion } = req.body;
        //Validacion datos de entrada
        if (!nombre || !correo || !contra || !telefono || !direccion) {
            res.status(400).send({ message: 'Datos incompletos porfavor verifique que ha llenado todos los datos' });
            return;
        }
        //instanciamos nuestro servicio
        const registerService = new RegisterService();
        //comprobamos si ya existe el correo si no pasamos al sig
        const existingUser = await registerService.isExistingUser(correo);
        if (existingUser) {
            return res.status(404).json({ message: "Usuario ya existe con ese correo" });
        }
        //ejecuta el registro
        const user = registerService.executeRegister(nombre,correo,contra,telefono,direccion)
        return res.json(user);
        
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};