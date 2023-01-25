import { Router } from "express";
import { getUserRoutes } from "./infra/http/routes/user.routes";

const router = Router();

// rotas do usuário
getUserRoutes(router)

export { router };