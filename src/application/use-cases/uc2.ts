import { User } from "../entities/user";
import { UsersRepository } from "../repositories/users-repository";
import { UsernameExists } from "./erros/check-exists";

interface UC2Request {
    username: string;
    password: string;
    userId: number;
}

type UC2Response = void;

export class UseCase2 {
    constructor (private usersRepository: UsersRepository) {}

    async execute(request: UC2Request): Promise<UC2Response> {
        const { username, password, userId } = request

        const usernameAlreadyExists = await this.usersRepository.findByUsername(username)

        if(usernameAlreadyExists){
            throw new UsernameExists()
        }

        const userAlreadyExists = await this.usersRepository.findById(userId)

        const user = new User({
            ...userAlreadyExists,
            username,
            password
        })

        await this.usersRepository.save(user)

    }
}