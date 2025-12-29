import express from "express";
import { LoginController, SignupController } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", SignupController);
router.post("/login", LoginController);

export default router;
