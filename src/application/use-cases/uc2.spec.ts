import { User } from "../entities/user"
import { InMemoryUsersRepository } from "../../../test/repositories/in-memory-users-repository"
import { UseCase2 } from "./uc2"
import { UsernameExists } from "./erros/check-exists"

describe('Update user', () => {
    it('should be able to update a user', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const uc2 = new UseCase2(usersRepository)

        const user = new User({
            username: 'teste@teste.com',
            password: "12345"
        })

        let created_user = await usersRepository.create(user)

        await uc2.execute({
            username: 'teste2@teste.com',
            password: "12345",
            userId: created_user.id
        })
    
        expect(usersRepository.users[0].username).toEqual('teste2@teste.com')
    })

    it('should not be able to update a user with existing username', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const uc2 = new UseCase2(usersRepository)

        const user = new User({
            username: 'teste@teste.com',
            password: "12345"
        })

        await usersRepository.create(user)

        const user2 = new User({
            username: 'teste2@teste.com',
            password: "12345"
        })

        await usersRepository.create(user2)

        expect(() => {
            return uc2.execute({
                username: 'teste2@teste.com',
                password: "12345",
                userId: user.id
            })
        }).rejects.toThrow(UsernameExists)
        
    })
})