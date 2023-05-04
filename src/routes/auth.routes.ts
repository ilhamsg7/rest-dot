import { container } from "tsyringe";
import { Router } from "express";
import AuthController from "../controller/auth.controller";

const router = Router();
const authController = container.resolve(AuthController);

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));

export default router;