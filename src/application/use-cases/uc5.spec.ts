import { User } from "../entities/user"
import { InMemoryUsersRepository } from "../../../test/repositories/in-memory-users-repository"
import { InMemoryAuthRepository } from "../../../test/repositories/in-memory-auth-repository"
import { UseCase5} from "./uc5"
import bcrypt  from 'bcrypt' 
import { DifferentPassword } from "./erros/different"

describe('auth user', () => {
    it('should be able to auth user', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const authRepository = new InMemoryAuthRepository()
        const uc5 = new UseCase5(usersRepository, authRepository)

        let password_hash = await bcrypt.hash('12345', 10)

        let user = new User({
            username: 'teste@teste.com',
            password: password_hash
        })

        await usersRepository.create(user)

        let token = await uc5.execute({
            username: user.username,
            password: "12345"
        })
        
        expect(token).toHaveProperty('token')
    })

    it('should not be able to auth user', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const authRepository = new InMemoryAuthRepository()
        const uc5 = new UseCase5(usersRepository, authRepository)

        let password_hash = await bcrypt.hash('12345', 10)

        let user = new User({
            username: 'teste@teste.com',
            password: password_hash
        })

        await usersRepository.create(user)

        let token = await 
        
        expect(() => {
            return uc5.execute({
                username: user.username,
                password: "1234"
            })
        }).rejects.toThrow(DifferentPassword)
    })
})