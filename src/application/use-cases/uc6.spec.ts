import { InMemoryAuthRepository } from "../../../test/repositories/in-memory-auth-repository"
import { InMemoryParkingRepository } from "../../../test/repositories/in-memory-parking-repository"
import { UseCase6} from "./uc6"
import { User } from "../entities/user"
import { NotAuthenticate } from "./erros/auth"

describe('entry register', () => {
    it('should be able to register a entry authenticated', async () => {
        const parkingRepository = new InMemoryParkingRepository()
        const authRepository = new InMemoryAuthRepository()

        const uc6 = new UseCase6(parkingRepository, authRepository)
        
        let token = await authRepository.execute(new User({
            username: 'teste@teste.com',
            password: '12345'
        }))

        await uc6.execute({
            license_plate: 'ABC1234',
            token: token.token
        })
    
        expect(parkingRepository.parking.length).toEqual(1)
    })

    it('should not be able to register a entry because is not authenticated', async () => {
        const parkingRepository = new InMemoryParkingRepository()
        const authRepository = new InMemoryAuthRepository()

        const uc6 = new UseCase6(parkingRepository, authRepository)
        
    
        expect(() => {
            return uc6.execute({
                license_plate: 'ABC1234',
                token: null
            })
        }).rejects.toThrow(NotAuthenticate)
    })
})