import { Router } from "express";
import { getParkingRoutes } from "./infra/http/routes/parking.routes";
import { getUserRoutes } from "./infra/http/routes/user.routes";

const router = Router();

getUserRoutes(router)
getParkingRoutes(router)

export { router };