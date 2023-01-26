import { User } from "@application/entities/user";
import { UsersRepository } from "@application/repositories/users-repository";
import { PrismaClient } from '@prisma/client'
import { PrismaUserMapper } from "../../../infra/database/mappers/prisma-users-mapper";

export class PrismaUserRepository implements UsersRepository {

    constructor(private prisma: PrismaClient) {}
    
    // função que encontra o usuário pelo id
    async findById(userId: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user){
            return null
        }

        return PrismaUserMapper.toDomain(user)
    }
    
    // função que encontra o usuário pelo username
    async findByUsername(username: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                username: username,
            }
        })

        if(!user){
            return null
        }

        return PrismaUserMapper.toDomain(user)
    }

    // função que encontra todos os usuários
    async findMany(): Promise<User[]> {
        const users = await this.prisma.user.findMany()

        return users.map(PrismaUserMapper.toDomain)
    }
    
    // função que cria um usuário
    async create(user: User): Promise<User> {
        const raw = PrismaUserMapper.toPrisma(user) 
        
        let userCreated = await this.prisma.user.create({
            data: raw
        })
        return PrismaUserMapper.toDomain(userCreated)
    }

    // função que atualiza um usuário 
    async save(user: User): Promise<void> {
        const raw = PrismaUserMapper.toPrisma(user) 
        raw.updated_at = new Date()
        
        await this.prisma.user.update({
            where: {
                id: raw.id
            },
            data: raw
        })
    }

    // função que deleta um usuário
    async delete(userId: number): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id: userId
            }
        })
    }
}