import { InMemoryAuthRepository } from "../../../test/repositories/in-memory-auth-repository"
import { InMemoryParkingRepository } from "../../../test/repositories/in-memory-parking-repository"
import { UseCase9} from "./uc9"
import { User } from "../entities/user"
import { NotAuthenticate } from "./erros/auth"
import { Parking } from "../entities/parking"

describe('Calculate value', () => {
    it('should be able to calculate value', async () => {
        const parkingRepository = new InMemoryParkingRepository()
        const authRepository = new InMemoryAuthRepository()

        const uc9 = new UseCase9(parkingRepository, authRepository)
        await parkingRepository.entry(new Parking({
            license_plate: "ABC1234",
            entry_time: new Date(new Date().getTime() - 20*60000)
        }))
        
        let token = await authRepository.execute(new User({
            username: 'teste@teste.com',
            password: '12345'
        }))

        let value_to_pay = await uc9.execute({
            license_plate: 'ABC1234',
            token: token.token
        })
        
        expect(value_to_pay).toBeGreaterThan(0)
    })

    it('should not be able to calculate value because is not authenticated', async () => {
        const parkingRepository = new InMemoryParkingRepository()
        const authRepository = new InMemoryAuthRepository()

        const uc9 = new UseCase9(parkingRepository, authRepository)
        
        expect(() => {
            return uc9.execute({
                license_plate: 'ABC1234',
                token: null
            })
        }).rejects.toThrow(NotAuthenticate)
    })
})