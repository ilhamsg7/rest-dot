import { Router } from "express";
import driverRoute from "./routes/driver.routes";
import powerUnitRoute from "./routes/power-unit.routes";
import principalRoute from "./routes/principal.routes";
import teamRoute from "./routes/team.routes";
const router = Router();

router.use("/drivers", driverRoute);
router.use("/power-units", powerUnitRoute);
router.use("/principals", principalRoute);
router.use("/teams", teamRoute);

export default router;