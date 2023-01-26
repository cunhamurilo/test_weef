import { Router } from "express";
import { getAuthRoutes } from "./infra/http/routes/auth.routes";
import { getParkingRoutes } from "./infra/http/routes/parking.routes";
import { getUserRoutes } from "./infra/http/routes/user.routes";

const router = Router();

getUserRoutes(router)
getParkingRoutes(router)
getAuthRoutes(router)

export { router };