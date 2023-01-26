import { User } from "../entities/user"
import { InMemoryUsersRepository } from "../../../test/repositories/in-memory-users-repository"
import { UseCase4} from "./uc4"

describe('list user', () => {
    it('should be able to list users', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const uc4 = new UseCase4(usersRepository)
        
        // cria dois usuários
        let users = [new User({
            username: 'teste@teste.com',
            password: "12345"
        }),new User({
            username: 'teste2@teste.com',
            password: "12345"
        })]

        let promise = users.map(async(user) => await usersRepository.create(user))
        
        await Promise.all(promise)
        
        // lista todos os usuários
        let list_users = await uc4.execute({})
    
        expect(list_users.users).toEqual(expect.arrayContaining(users))
    })

})