import express from 'express';
import { register } from '../controllers/register.controller';

const router = express.Router();

//Crear un nuevo usuario
router.post('/register', register);

export default router;