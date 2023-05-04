import { Router } from "express";
import { container } from "tsyringe";
import PrincipalController from "../controller/principal.controller";
import authMiddleware from "../middleware/auth";

const router = Router();
const principalController = container.resolve(PrincipalController);

router.get("/", authMiddleware(["user", "admin"]), (req, res) => principalController.getAllPrincipal(req, res));
router.get("/:id", authMiddleware(["user", "admin"]), (req, res) => principalController.getPrincipalById(req, res));
router.post("/", authMiddleware(["admin"]), (req, res) => principalController.createPrincipal(req, res));
router.put("/:id", authMiddleware(["admin"]), (req, res) => principalController.updatePrincipal(req, res));
router.delete("/:id/delete", authMiddleware(["admin"]), (req, res) => principalController.deletePrincipal(req, res));

export default router;