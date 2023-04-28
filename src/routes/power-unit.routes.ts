import { Router } from "express";
import PowerUnitController from "../controller/power-unit.controller";
import { container } from "tsyringe";

const router = Router();
const powerUnitController = container.resolve(PowerUnitController);

router.get("/", (req, res) => powerUnitController.getAllPowerUnit(req, res));
router.get("/:id", (req, res) => powerUnitController.getPowerUnitById(req, res));
router.post("/", (req, res) => powerUnitController.createPowerUnit(req, res));
router.put("/:id", (req, res) => powerUnitController.updatePowerUnit(req, res));
router.put("/:id", (req, res) => powerUnitController.deletePowerUnit(req, res));

export default router;