import express from "express";
import { resetPassword } from "../controllers/resetpassword.controller";

const router = express.Router();

router.post("/resetpassword/:resetToken", resetPassword);

export default router;

