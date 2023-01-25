import { Router } from "express";
import { UserController } from "../controllers/users.controller";

const createUserController = new UserController();

export function getUserRoutes (router: Router){
    router.post(
        "/users",
        createUserController.createUser
    );
    router.get(
        "/users/:id",
        createUserController.findByIdUser
    );
    router.get(
        "/users",
        createUserController.findManyUser
    );
    router.patch(
        "/users/:id",
        createUserController.updateUser
    );
    router.delete(
        "/users/:id",
        createUserController.deleteUser
    );
}