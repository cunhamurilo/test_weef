import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { PrismaUserRepository } from "../../database/repositories/prisma-users-repository";
import { AuthRepository } from "../../database/repositories/prisma-auth.repository";
import bcrypt  from 'bcrypt' 

const prisma = new PrismaClient()

class AuthController {
  async auth(request: Request, response: Response) {
    const { username, password } = request.body;
    
    // Verificar se email existe
    const userService = new PrismaUserRepository(prisma);
    const user = await userService.findByUsername(username);
    
    if (!user) {
      return response.status(400).json({status:"Usuário não existe"}) 
    }
    let password_check_hash = await bcrypt.compare(password, user.password)

    if(!password_check_hash){
      return response.status(400).json({status:"Senhas diferentes"})
    }

    const authRepository = new AuthRepository();

    let token = await authRepository.execute({user});
    
    return response.status(200).json(token); 
  }

}

export { AuthController };