import { User } from "../entities/user"
import { InMemoryUsersRepository } from "../../../test/repositories/in-memory-users-repository"
import { UserNotExists } from "./erros/check-exists"
import { UseCase3 } from "./uc3"

describe('Delete user', () => {
    it('should be able to delete a user', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const uc3 = new UseCase3(usersRepository)
        
        // cria um usuário
        const user = new User({
            username: 'teste@teste.com',
            password: "12345"
        })

        await usersRepository.create(user)
        
        // deleta um usuário existente
        await uc3.execute({
            userId: user.id
        })
    
        expect(usersRepository.users.length).toEqual(0)
    })

    it('should not be able to delete a user not exists', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const uc3 = new UseCase3(usersRepository)
        
        // tenta deletar um usuário que não existe
        expect(() => {
            return uc3.execute({
                userId: 0
            })
        }).rejects.toThrow(UserNotExists)
    })
})