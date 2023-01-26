import { InMemoryUsersRepository } from "../../../test/repositories/in-memory-users-repository"
import { UserExists } from "./erros/check-exists"
import { UseCase1 } from "./uc1"

describe('Create user', () => {
    it('should be able to create a user', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const uc1 = new UseCase1(usersRepository)
        
        const user = await uc1.execute({
            username: 'teste@teste.com',
            password: "12345"
        })
    
        expect(usersRepository.users.length).toEqual(1)
    })

    it('should not be able to create a same user', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const uc1 = new UseCase1(usersRepository)
        
        await uc1.execute({
            username: 'teste@teste',
            password: "12345"
        })
    
        expect(() => {
            return uc1.execute({
                username: 'teste@teste',
                password: "12345"
            })
        }).rejects.toThrow(UserExists)
    })
})