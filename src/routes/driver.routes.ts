import { Router } from "express";
import DriverController from "../controller/driver.controller";
import { container } from "tsyringe";

const router = Router();
const driverController = container.resolve(DriverController);

router.get("/", (req, res) => driverController.getAllDrivers(req, res));
router.get("/:id", (req, res) => driverController.getDriverById(req, res));
router.post("/", (req, res) => driverController.createDriver(req, res));
router.put("/:id", (req, res) => driverController.updateDriver(req, res));
router.put("/:id", (req, res) => driverController.deleteDriver(req, res));

export default router;