import { User } from "@application/entities/user"
import { UsersRepository } from "@application/repositories/users-repository"

export class InMemoryUsersRepository implements UsersRepository {
    public users: User[] = []
    
    // função que imita encontrar um usuário pelo id
    async findById(userId: number): Promise<User | null> {
        const user = this.users.find((item) => item.id === userId)

        if(!user)
            return null

        return user
    }

    // função que imita criar um usuário
    async create(user: User): Promise<User>{
        this.users.push(user)
        return user
    }

    // função que imita atualizar um usuário
    async save(notification: User): Promise<void> {
        const notificationIndex = this.users.findIndex((item) => item.id === notification.id)

        if(notificationIndex >= 0){
            this.users[notificationIndex] = notification
        }
    }

    // função que imita encontrar um usuário pelo username
    async findByUsername(username: string): Promise<User | null> {
        const user = this.users.find((item) => item.username === username)

        if(!user)
            return null

        return user
    }

    // função que imita encontrar todos os usuários
    async findMany(): Promise<User[]> {
        return this.users
    }

    // função que imita deletar um usuário
    async delete(userId: number): Promise<void> {
        this.users = this.users.filter((item) => item.id !== userId)
    }
}