import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { PrismaUserRepository } from "../../database/repositories/prisma-users-repository";
import { User } from "@application/entities/user";
import { PrismaUserMapper } from "../../database/mappers/prisma-users-mapper";
import bcrypt  from 'bcrypt' 
import { UserViewModel } from "../view-models/user-view-model";

const prisma = new PrismaClient()

class UserController {

  // controlador que verifica se um usuário já existe 
  // para poder criar um usuário
  async createUser(request: Request, response: Response) {
    const { username, password } = request.body;

    const userService = new PrismaUserRepository(prisma);

    const userAlreadyExist = await userService.findByUsername(username)

    if(userAlreadyExist){
      return response.status(200).json({ status: "Usuário já existe" })
    }

    let password_hash = await bcrypt.hash(password, 10)

    const user = await userService.create({
      username,
      password: password_hash,
    } as User);
    
    return response.status(201).json(UserViewModel.toHTTP(user)); 
  }

  // controlador que retorna os usuários pelo id
  async findByIdUser(request: Request, response: Response){
    const { id } = request.params;
    const userService = new PrismaUserRepository(prisma);
    const user = await userService.findById(parseInt(id));

    if(user)
      return response.json(UserViewModel.toHTTP(user));
    return response.json({})
  }

  // controlador que retorna todos os usuários
  async findManyUser(request: Request, response: Response) {
    const findUsersService = new PrismaUserRepository(prisma);
    const users = await findUsersService.findMany();

    return response.json(users.map(UserViewModel.toHTTP));
  }

  // controlador que atualiza um usuário pelo id
  async updateUser(request: Request, response: Response){
    const { id } = request.params;
    const { username, password } = request.body;

    const userService = new PrismaUserRepository(prisma);
    const userAlreadyExist = await prisma.user.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    if(!userAlreadyExist){
      return response.status(200).json({ status: "Usuário não existe" })
    }

    let password_hash = await bcrypt.hash(password, 10)
    userAlreadyExist.password = password_hash
    userAlreadyExist.username = username

    await userService.save(PrismaUserMapper.toDomain(userAlreadyExist));
    return response.status(200).json({ status: "Usuário atualizado"}); ; 
  }

  // controlador que deleta um usuário pelo id
  async deleteUser(request: Request, response: Response){
    const { id } = request.params;

    const userService = new PrismaUserRepository(prisma);
    const userAlreadyExist = await prisma.user.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    if(!userAlreadyExist){
      return response.status(200).json({ status: "Usuário não existe" })
    }

    await userService.delete(userAlreadyExist.id);
    return response.status(200).json({ status: "Usuário excluido"}); ; 
  }

}

export { UserController };