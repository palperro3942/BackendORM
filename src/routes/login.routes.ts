import express from 'express';
import {login} from '../controllers/login.controller';

const router = express.Router();

// Endpoint para iniciar sesión
router.post('/login', login);

export default router