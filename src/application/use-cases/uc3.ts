import { UsersRepository } from "../repositories/users-repository";
import { UserNotExists } from "./erros/check-exists";

interface UC3Request {
    userId: number;
}

type UC3Response = void;

export class UseCase3 {
    constructor (private usersRepository: UsersRepository) {}

    async execute(request: UC3Request): Promise<UC3Response> {
        const { userId } = request

        // verifica se usuário existe para deletar
        const userAlreadyExists = await this.usersRepository.findById(userId)

        if(!userAlreadyExists){
            throw new UserNotExists()
        }

        await this.usersRepository.delete(userId)

    }
}