import { Router } from "express";
import { container } from "tsyringe";
import PrincipalController from "../controller/principal.controller";

const router = Router();
const principalController = container.resolve(PrincipalController);

router.get("/", (req, res) => principalController.getAllPrincipal(req, res));
router.get("/:id", (req, res) => principalController.getPrincipalById(req, res));
router.post("/", (req, res) => principalController.createPrincipal(req, res));
router.put("/:id", (req, res) => principalController.updatePrincipal(req, res));
router.put("/:id", (req, res) => principalController.deletePrincipal(req, res));

export default router;