import { Router } from "express";
import driverRoute from "./routes/driver.routes";
import powerUnitRoute from "./routes/power-unit.routes";
const router = Router();

router.use("/drivers", driverRoute);
router.use("/power-units", powerUnitRoute);

export default router;