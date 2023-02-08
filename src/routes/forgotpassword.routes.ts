import express from 'express';
import {forgotPassword} from '../controllers/forgotpassword.controller';

const router = express.Router();

// Forgot password route
router.route('/forgot-password').post(forgotPassword);

export default router;
