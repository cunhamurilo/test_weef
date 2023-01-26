import { Router } from "express";
import { UserController } from "../controllers/users.controller";

const createUserController = new UserController();

export function getUserRoutes (router: Router){
    // rota para criar um usuário
    router.post(
        "/users",
        createUserController.createUser
    );
    // rota para encontrar um usuário pelo id
    router.get(
        "/users/:id",
        createUserController.findByIdUser
    );
    // rota para encontrar todos os usuários
    router.get(
        "/users",
        createUserController.findManyUser
    );
    // rota para atualizar um usuário
    router.patch(
        "/users/:id",
        createUserController.updateUser
    );
    // rota para deletar um usuário
    router.delete(
        "/users/:id",
        createUserController.deleteUser
    );
}