import { User } from "../entities/user";
import { UsersRepository } from "../repositories/users-repository";

interface UC4Request {
}

interface UC4Response {
    users: User[]
};

export class UseCase4 {
    constructor (private usersRepository: UsersRepository) {}

    async execute(request: UC4Request): Promise<UC4Response> {
        const { } = request

        const users = await this.usersRepository.findMany()

        return {
            users
        }

    }
}