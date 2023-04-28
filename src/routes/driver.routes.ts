import { Router } from "express";
import DriverController from "../controller/driver.controller";
import { container } from "tsyringe";

const router = Router();
const driverController = container.resolve(DriverController);

router.get("/", driverController.getAllDrivers.bind(driverController));

export default router;