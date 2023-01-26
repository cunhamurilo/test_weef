import { AuthRepository } from "../repositories/auth-repository";
import { ParkingRepository } from "../repositories/parking-repository";
import { NotAuthenticate } from "./erros/auth";
import { CarNotExists } from "./erros/check-exists";
import { DifferentAmountPaid } from "./erros/different";

interface UC7Request {
    license_plate: string;
    exit_time: Date | null;
    token: string | null;
}

type UC7Response = number

export class UseCase7 {
    constructor (private parkingRepository: ParkingRepository, private authRepositoty: AuthRepository) {}

    async execute(request: UC7Request): Promise<UC7Response> {
        const { license_plate, exit_time, token } = request

        // verifica token
        const checkToken = await this.authRepositoty.ensureAuthenticate('Bearer '+token || '')
        if(!checkToken){
            throw new NotAuthenticate()
        }

        // verifica se veiculo está estacionado
        const parkingAlreadExists = await this.parkingRepository.findByLicencePlate(license_plate);
    
        if (!parkingAlreadExists) {
            throw new CarNotExists()
        }

        // verifica se pagamento já foi realizado
        if(
            parkingAlreadExists.amount_paid === 0 || 
            parkingAlreadExists.amount_paid === null || 
            parkingAlreadExists.amount_paid === undefined 
        ){
            throw new DifferentAmountPaid()
        }

        // calculo o tempo estacionado
        parkingAlreadExists.exit_time = exit_time
        let calculated_parking = await this.parkingRepository.exit(parkingAlreadExists)

        return calculated_parking.time_parked_in_minutes || 0
    }
}