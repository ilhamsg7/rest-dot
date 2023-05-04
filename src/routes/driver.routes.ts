import { Router } from "express";
import DriverController from "../controller/driver.controller";
import { container } from "tsyringe";
import authMiddleware from "../middleware/auth";

const router = Router();
const driverController = container.resolve(DriverController);

router.get("/", authMiddleware(["user", "admin"]), (req, res) => driverController.getAllDrivers(req, res));
router.get("/:id", authMiddleware(["user", "admin"]),(req, res) => driverController.getDriverById(req, res));
router.post("/", authMiddleware(["admin"]), (req, res) => driverController.createDriver(req, res));
router.put("/:id", authMiddleware(["admin"]), (req, res) => driverController.updateDriver(req, res));
router.put("/:id/delete", authMiddleware(["admin"]), (req, res) => driverController.deleteDriver(req, res));

export default router;