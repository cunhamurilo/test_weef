import { AuthRepository } from "../repositories/auth-repository";
import { UsersRepository } from "../repositories/users-repository";
import { DifferentPassword } from "./erros/different";
import { UserNotExists } from "./erros/check-exists";
import bcrypt  from 'bcrypt' 

interface UC5Request {
    username: string;
    password: string;
}

interface UC5Response {
    token: string;
}

export class UseCase5 {
    constructor (private usersRepository: UsersRepository, private authRepository: AuthRepository) {}

    async execute(request: UC5Request): Promise<UC5Response> {
        const { username, password} = request

        // encontra usuário pelo username
        const user = await this.usersRepository.findByUsername(username);
    
        if (!user) {
            throw new UserNotExists()
        }

        // verifica as senhas
        let password_check_hash = await bcrypt.compare(password, user.password)
    
        if(!password_check_hash){
            throw new DifferentPassword()
        }

        let token = await this.authRepository.execute(user);

        return token
    }
}