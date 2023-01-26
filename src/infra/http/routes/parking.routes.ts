import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAutenticated";
import { ParkingController } from "../controllers/parking.controller";

const createParkingController = new ParkingController();

export function getParkingRoutes (router: Router){
    // rota para realizar uma entrada no estacionamento
    router.post(
        "/parking/entry",
        ensureAuthenticated,
        createParkingController.entry
    );
    // rota para realizar uma saida no estacionamento
    router.post(
        "/parking/exit",
        ensureAuthenticated,
        createParkingController.exit
    );
    // rota para efetuar o pagamento do estacionamento
    router.post(
        "/parking/payment",
        ensureAuthenticated,
        createParkingController.payment
    );
    // rota para obter o calor a ser pago do estacionamento
    router.get(
        "/parking/value/:licence_plate",
        ensureAuthenticated,
        createParkingController.calculate_value
    );
}