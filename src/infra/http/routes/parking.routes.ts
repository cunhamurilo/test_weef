import { Router } from "express";
import { ParkingController } from "../controllers/parking.controller";

const createParkingController = new ParkingController();

export function getParkingRoutes (router: Router){
    router.post(
        "/parking/entry",
        createParkingController.entry
    );
    router.post(
        "/parking/exit",
        createParkingController.exit
    );
    router.post(
        "/parking/payment",
        createParkingController.payment
    );
    router.get(
        "/parking/value/:licence_plate",
        createParkingController.calculate_value
    );
}