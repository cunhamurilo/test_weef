import { User } from "@application/entities/user"
import { UsersRepository } from "@application/repositories/users-repository"

export class InMemoryUsersRepository implements UsersRepository {
    public users: User[] = []
    
    async findById(userId: number): Promise<User | null> {
        const user = this.users.find((item) => item.id === userId)

        if(!user)
            return null

        return user
    }

    async create(user: User): Promise<User>{
        this.users.push(user)
        return user
    }

    async save(notification: User): Promise<void> {
        const notificationIndex = this.users.findIndex((item) => item.id === notification.id)

        if(notificationIndex >= 0){
            this.users[notificationIndex] = notification
        }
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = this.users.find((item) => item.username === username)

        if(!user)
            return null

        return user
    }

    async findMany(): Promise<User[]> {
        return this.users
    }

    async delete(userId: number): Promise<void> {
        this.users = this.users.filter((item) => item.id !== userId)
    }
}