import { Router } from "express";
import driverRoute from "./routes/driver.routes";
const router = Router();

router.use("/drivers", driverRoute);

export default router;