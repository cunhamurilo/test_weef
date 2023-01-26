import { User } from "../entities/user";
import { UsersRepository } from "../repositories/users-repository";
import { UserExists } from "./erros/check-exists";

interface UC1Request {
    username: string;
    password: string;
}

interface UC1Response {
    user: User
}

export class UseCase1 {
    constructor (private usersRepository: UsersRepository) {}

    async execute(request: UC1Request): Promise<UC1Response> {
        const { username, password } = request

        // cria um usuário e verifica se ele já existe
        const userAlreadyExists = await this.usersRepository.findByUsername(username)

        if(userAlreadyExists){
            throw new UserExists()
        }

        const user = new User({
            username, password
        })

        // salva e retorna esse novo usuário
        await this.usersRepository.create(user)

        return {
            user,
        }
    }
}