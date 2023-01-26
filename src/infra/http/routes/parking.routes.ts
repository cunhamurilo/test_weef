import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAutenticated";
import { ParkingController } from "../controllers/parking.controller";

const createParkingController = new ParkingController();

export function getParkingRoutes (router: Router){
    router.post(
        "/parking/entry",
        ensureAuthenticated,
        createParkingController.entry
    );
    router.post(
        "/parking/exit",
        ensureAuthenticated,
        createParkingController.exit
    );
    router.post(
        "/parking/payment",
        ensureAuthenticated,
        createParkingController.payment
    );
    router.get(
        "/parking/value/:licence_plate",
        ensureAuthenticated,
        createParkingController.calculate_value
    );
}