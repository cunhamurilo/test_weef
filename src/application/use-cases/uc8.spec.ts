import { InMemoryAuthRepository } from "../../../test/repositories/in-memory-auth-repository"
import { InMemoryParkingRepository } from "../../../test/repositories/in-memory-parking-repository"
import { UseCase8} from "./uc8"
import { User } from "../entities/user"
import { NotAuthenticate } from "./erros/auth"
import { Parking } from "../entities/parking"
import { DifferentAmount } from "./erros/different"

describe('Payment value', () => {
    it('should be able to payment value', async () => {
        const parkingRepository = new InMemoryParkingRepository()
        const authRepository = new InMemoryAuthRepository()

        const uc8 = new UseCase8(parkingRepository, authRepository)

        await parkingRepository.entry(new Parking({
            license_plate: "ABC1234",
            entry_time: new Date(new Date().getTime() - 20*60000)
        }))
        
        await parkingRepository.calculate_value(parkingRepository.parking[0])
        
        let token = await authRepository.execute(new User({
            username: 'teste@teste.com',
            password: '12345'
        }))

        let discount = await uc8.execute({
            license_plate: 'ABC1234',
            amount_paid: 25,
            token: token.token
        })
        
        expect(discount).toBeGreaterThan(0)
    })

    it('should be able to payment value because amount paid is less than value to pay', async () => {
        const parkingRepository = new InMemoryParkingRepository()
        const authRepository = new InMemoryAuthRepository()

        const uc8 = new UseCase8(parkingRepository, authRepository)

        await parkingRepository.entry(new Parking({
            license_plate: "ABC1234",
            entry_time: new Date(new Date().getTime() - 20*60000)
        }))

        await parkingRepository.calculate_value(parkingRepository.parking[0])
        
        let token = await authRepository.execute(new User({
            username: 'teste@teste.com',
            password: '12345'
        }))

        expect(() => {
            return uc8.execute({
                license_plate: 'ABC1234',
                amount_paid: 10,
                token: token.token
            })
        }).rejects.toThrow(DifferentAmount)
    })

    it('should not be able to payment value because is not authenticated', async () => {
        const parkingRepository = new InMemoryParkingRepository()
        const authRepository = new InMemoryAuthRepository()

        const uc8 = new UseCase8(parkingRepository, authRepository)
        
        expect(() => {
            return uc8.execute({
                license_plate: 'ABC1234',
                amount_paid: 25,
                token: null
            })
        }).rejects.toThrow(NotAuthenticate)
    })
})