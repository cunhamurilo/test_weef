import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const authController = new AuthController();

export function getAuthRoutes (router: Router){
    router.post(
        "/auth",
        authController.auth
    );
}