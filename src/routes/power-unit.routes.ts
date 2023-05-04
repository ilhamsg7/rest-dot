import { Router } from "express";
import PowerUnitController from "../controller/power-unit.controller";
import { container } from "tsyringe";
import authMiddleware from "../middleware/auth";

const router = Router();
const powerUnitController = container.resolve(PowerUnitController);

router.get("/", authMiddleware(["user", "admin"]), (req, res) => powerUnitController.getAllPowerUnit(req, res));
router.get("/:id", authMiddleware(["user", "admin"]), (req, res) => powerUnitController.getPowerUnitById(req, res));
router.post("/", authMiddleware(["admin"]), (req, res) => powerUnitController.createPowerUnit(req, res));
router.put("/:id", authMiddleware(["admin"]), (req, res) => powerUnitController.updatePowerUnit(req, res));
router.put("/:id/delete", authMiddleware(["admin"]), (req, res) => powerUnitController.deletePowerUnit(req, res));

export default router;