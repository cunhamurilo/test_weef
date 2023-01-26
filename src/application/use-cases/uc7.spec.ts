import { InMemoryAuthRepository } from "../../../test/repositories/in-memory-auth-repository"
import { InMemoryParkingRepository } from "../../../test/repositories/in-memory-parking-repository"
import { UseCase7} from "./uc7"
import { User } from "../entities/user"
import { NotAuthenticate } from "./erros/auth"
import { Parking } from "../entities/parking"
import { DifferentAmountPaid } from "./erros/different"

describe('Exit value', () => {
    it('should be able to exit value', async () => {
        const parkingRepository = new InMemoryParkingRepository()
        const authRepository = new InMemoryAuthRepository()

        const uc7 = new UseCase7(parkingRepository, authRepository)

        // faz uma entrada de um veiculo com 20 minutos da hora atual
        // com pagamento ja realizado
        await parkingRepository.entry(new Parking({
            license_plate: "ABC1234",
            entry_time: new Date(new Date().getTime() - 20*60000),
            amount_paid: 30,
            value_to_pay: 25,
        }))
        
        // obtem o token
        let token = await authRepository.execute(new User({
            username: 'teste@teste.com',
            password: '12345'
        }))

        // anota a saido do veiculo e ve se tem desconto
        let discount = await uc7.execute({
            license_plate: 'ABC1234',
            exit_time: new Date(new Date().getTime() + 20*60000),
            token: token.token
        })
        
        expect(discount).toBeGreaterThan(0)
    })

    it('should be able to exit value because amount paid is null', async () => {
        const parkingRepository = new InMemoryParkingRepository()
        const authRepository = new InMemoryAuthRepository()

        const uc7 = new UseCase7(parkingRepository, authRepository)

        // faz uma entrada de um veiculo com 20 minutos da hora atual
        // sem pagamento
        await parkingRepository.entry(new Parking({
            license_plate: "ABC1234",
            entry_time: new Date(new Date().getTime() - 20*60000),
            value_to_pay: 25
        }))
        
        // obtem o token
        let token = await authRepository.execute(new User({
            username: 'teste@teste.com',
            password: '12345'
        }))

        expect(() => {
            return uc7.execute({
                license_plate: 'ABC1234',
                exit_time: null,
                token: token.token
            })
        }).rejects.toThrow(DifferentAmountPaid)
    })

    it('should not be able to exit because is not authenticated', async () => {
        const parkingRepository = new InMemoryParkingRepository()
        const authRepository = new InMemoryAuthRepository()

        const uc7 = new UseCase7(parkingRepository, authRepository)

        // faz uma entrada de um veiculo com 20 minutos da hora atual
        await parkingRepository.entry(new Parking({
            license_plate: "ABC1234",
            entry_time: new Date(new Date().getTime() - 20*60000),
            amount_paid: 30,
            value_to_pay: 20
        }))
        
        // verifica se deixa sair sem usuário autenticado
        expect(() => {
            return uc7.execute({
                license_plate: 'ABC1234',
                exit_time: null,
                token: null
            })
        }).rejects.toThrow(NotAuthenticate)
    })
})