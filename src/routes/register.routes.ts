import express from 'express';
import { register,confirmRegistration } from '../controllers/register.controller';

const router = express.Router();

//Crear un nuevo usuario
router.post('/register', register);

//Confirmar la registracion
router.post('/register/confirm/:confirmationHash', confirmRegistration);


export default router;